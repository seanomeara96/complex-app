const postsCollection = require("../db").db().collection("posts");
const followsCollection = require("../db").db().collection("follows");
const ObjectID = require("mongodb").ObjectID;
const User = require("./User");
const sanitizeHTML = require("sanitize-html");

let Post = function (data, userid, requestedPostId) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
  this.requestedPostId = requestedPostId;
};

Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save post to database
      postsCollection
        .insertOne(this.data)
        .then((info) => {
          resolve(info.ops[0]._id);
        })
        .catch(() => {
          this.errors.push("please try again later");
          reject(this.errors);
        });
    } else {
      //reject
      reject(this.errors);
    }
  });
};

Post.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.findSingleById(this.requestedPostId, this.userid);
      if (post.isVisitorOwner) {
        // Update the db
        let status = await this.actuallyUpdate();
        resolve(status);
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Post.prototype.actuallyUpdate = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await postsCollection.findOneAndUpdate(
        { _id: new ObjectID(this.requestedPostId) },
        { $set: { title: this.data.title, body: this.data.body } }
      );
      resolve("success");
    } else {
      resolve("failure");
    }
  });
};

Post.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }
  // Get rid of any bogus properties
  this.data = {
    title: sanitizeHTML(this.data.title.trim(), {
      allowedTags: [],
      allowedAttributes: [],
    }),
    body: sanitizeHTML(this.data.body.trim(), {
      allowedTags: [],
      allowedAttributes: [],
    }),
    // First argument is what you are trying to sanitize
    // Second is an object with configuration options
    createdDate: new Date(),
    // We use this ObjectID function because mongo
    // prefers that we store IDs as objects ratgher than strings of text
    author: ObjectID(this.userid),
  };
};

Post.prototype.validate = function () {
  if (this.data.title == "") {
    this.errors.push("you must provide a title");
  }
  if (this.data.body == "") {
    this.errors.push("you must provide post content");
  }
};

Post.reusablePostQuery = function (uniqueOperations, visitorId) {
  return new Promise(async function (resolve, reject) {
    let aggOperations = uniqueOperations.concat([
      // Here we a performing a lookup
      // Aggregate takes an array of database operations
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDocument",
        },
      },
      // We are currently using the post collection
      // We want to perform our lookup in the users collection
      // We are looking for an author property
      // This gets returned as an array called authorDocument
      {
        $project: {
          // $project allows us to spell out exactly what fields we want the resulting object to have
          title: 1, // 1 is a way to accept the field "as is"
          body: 1,
          createdDate: 1,
          authorId: "$author",
          author: { $arrayElemAt: ["$authorDocument", 0] },
          // $arrayElemAt returns the array element at the 0 position which is an object
          // containing the author name and email address (gravatar)
        },
      },
    ]);
    // .findOne({_id: new ObjectID(id)}) == this was replaced with the aggregate function
    try {
      let posts = await postsCollection.aggregate(aggOperations).toArray();
      // Aggregate - when we need to perform complex or multiple operations
      // aggregate is going to return data in a mongodb format so we push it to array to make it js readable

      // clean up author property in each post object
      posts = posts.map(function (post) {
        post.isVisitorOwner = post.authorId.equals(visitorId);
        post.authorId = undefined;
        post.author = {
          username: post.author.username,
          avatar: new User(post.author, true).avatar,
        };
        return post;
      });
      resolve(posts);
    } catch (err) {
      console.log("Error from reusablepost query", err);
      reject(err);
    }
  });
};

Post.findSingleById = function (id, visitorId) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      //OjectID converts the string into mongodb format
      reject();
      return;
    }
    let posts = await Post.reusablePostQuery(
      [{ $match: { _id: new ObjectID(id) } }],
      visitorId
    );
    if (posts.length) {
      console.log(posts[0]);
      // If this mongodb finds a post (array has more than 0 items) this will return true
      resolve(posts[0]);
    } else {
      reject();
    }
  });
};

Post.findByAuthorId = function (authorId) {
  return Post.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } },
  ]);
};

Post.delete = function (postIdToDelete, currentUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.findSingleById(postIdToDelete, currentUserId);
      if (post.isVisitorOwner) {
        await postsCollection.deleteOne({ _id: new ObjectID(postIdToDelete) });
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Post.search = function (searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == "string") {
      try {
        console.log("...searching");
        let posts = await Post.reusablePostQuery([
          { $match: { $text: { $search: searchTerm } } },
          { $sort: { score: { $meta: "textScore" } } },
        ]);
        console.log(posts);
        resolve(posts);
      } catch (err) {
        console.log("error with search", err);
        reject();
      }
    } else {
      reject();
    }
  });
};

Post.countPostsByAuthor = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let postCount = await postsCollection.countDocuments({ author: id });
      resolve(postCount);
    } catch (err) {
      reject(err);
    }
  });
};

Post.getFeed = async function (id) {
  // Create an array of the user ids that the current user follows
  let followedUsers = await followsCollection
    .find({ authorId: new ObjectID(id) })
    .toArray();
  followedUsers = followedUsers.map(function (followDoc) {
    return followDoc.followedId;
  });
  // Look for posts where author is in the above array of followed users
  return Post.reusablePostQuery([
    { $match: { author: { $in: followedUsers } } },
    { $sort: { createdDate: -1 } },
  ]);
};
module.exports = Post;
