import { globalClient } from "../db";
import { ObjectID } from "mongodb";
import User from "./User";
import sanitizeHTML from "sanitize-html";
let postsCollection = globalClient?.db().collection("posts");
let followsCollection = globalClient?.db().collection("follows");

interface postData {
  title: string;
  body: string;
  createdDate?: Date;
  author?: ObjectID;
}

class Post {
  data: postData;
  errors: string[];
  userid: ObjectID;
  requestedPostId?: ObjectID;
  isVisitorOwner?: boolean;
  constructor(data: postData, userid: ObjectID, requestedPostId?: ObjectID) {
    this.data = data;
    this.errors = [];
    this.userid = userid;
    this.requestedPostId = requestedPostId;
  }
  create!: () => Promise<string>;
  update!: () => Promise<string>;
  actuallyUpdate!: () => Promise<string>;
  cleanUp!: () => void;
  validate!: () => void;
  deletePost!: (
    postIdToDelete: ObjectID,
    currentUserId: ObjectID
  ) => Promise<void>;
  findSingleById!: (id: ObjectID, visitorId: ObjectID) => Promise<Post>;
  reusablePostQuery!: (
    uniqueOperations: any,
    visitorId?: ObjectID
  ) => Promise<Post[]>;
  findByAuthorId!: (authorId: string) => Promise<Post[]>;
  search!: (searchTerm: string) => Promise<Post[]>;
  countPostsByAuthor!: (id: ObjectID) => Promise<number>;
  getFeed!: (id: ObjectID) => Promise<Post[]>;
}

Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save post to database
      postsCollection
        ?.insertOne(this.data)
        .then((info: any) => {
          // fix this
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
      let post = await Post.prototype.findSingleById(
        this.requestedPostId!,
        this.userid
      );
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
      await postsCollection?.findOneAndUpdate(
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
      allowedAttributes: {},
    }),
    body: sanitizeHTML(this.data.body.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    // First argument is what you are trying to sanitize
    // Second is an object with configuration options
    createdDate: new Date(),
    // We use this ObjectID function because mongo
    // prefers that we store IDs as objects ratgher than strings of text
    author: new ObjectID(this.userid),
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

Post.prototype.reusablePostQuery = function (
  uniqueOperations: any,
  visitorId?: ObjectID
) {
  return new Promise(async function (resolve, reject) {
    let aggOperations = uniqueOperations.concat([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDocument",
        },
      },
      {
        $project: {
          title: 1, // 1 is a way to accept the field "as is"
          body: 1,
          createdDate: 1,
          authorId: "$author",
          author: { $arrayElemAt: ["$authorDocument", 0] },
        },
      },
    ]);
    try {
      let posts = await postsCollection?.aggregate(aggOperations).toArray();
      posts = posts?.map(function (post: any) {
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

Post.prototype.findSingleById = function (id: ObjectID, visitorId: ObjectID) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      //OjectID converts the string into mongodb format
      reject();
      return;
    }
    let posts: Post[] = await Post.prototype.reusablePostQuery(
      [{ $match: { _id: new ObjectID(id) } }],
      new ObjectID(visitorId)
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

Post.prototype.findByAuthorId = function (authorId: string) {
  return Post.prototype.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } },
  ]);
};

Post.prototype.deletePost = function (
  postIdToDelete: ObjectID,
  currentUserId: ObjectID
) {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.prototype.findSingleById(
        postIdToDelete,
        currentUserId
      );
      if (post.isVisitorOwner) {
        await postsCollection?.deleteOne({ _id: new ObjectID(postIdToDelete) });
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Post.prototype.search = function (searchTerm: string) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == "string") {
      try {
        console.log("...searching");
        let posts = await Post.prototype.reusablePostQuery([
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

Post.prototype.countPostsByAuthor = function (id: ObjectID) {
  return new Promise(async (resolve, reject) => {
    try {
      let postCount = await postsCollection?.countDocuments({ author: id });
      resolve(postCount);
    } catch (err) {
      reject(err);
    }
  });
};

Post.prototype.getFeed = async function (id: ObjectID) {
  // Create an array of the user ids that the current user follows
  let followedUsers = await followsCollection
    ?.find({ authorId: new ObjectID(id) })
    .toArray();
  followedUsers = followedUsers?.map(function (followDoc: any) {
    return followDoc.followedId;
  });
  // Look for posts where author is in the above array of followed users
  return Post.prototype.reusablePostQuery([
    { $match: { author: { $in: followedUsers } } },
    { $sort: { createdDate: -1 } },
  ]);
};

export default Post;
