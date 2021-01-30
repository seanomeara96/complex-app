import { globalClient, fetchCollection } from "../db";
import { ObjectID, Collection } from "mongodb";
import User from "./User";
import sanitizeHTML from "sanitize-html";
import axios from "axios";

interface postData {
  title: string;
  body: string;
  location: {
    lat: number | null;
    long: number | null;
  };
  weather: string;
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
// ideally location parameters would not be passed to getWeather before they were cleaned
Post.prototype.create = function () {
  console.log(this.data, "this is the data in the Post model");
  return new Promise(async (resolve, reject) => {
    this.data.weather = await getWeather(
      this.data.location.lat,
      this.data.location.lat
    );
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save post to database
      fetchCollection("posts")
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
      await fetchCollection("posts")?.findOneAndUpdate(
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
  if (typeof this.data.weather != "string") {
    this.data.weather = "";
  }
  if (
    typeof this.data.location?.lat != "number" ||
    typeof this.data.location.long != "number" ||
    isValidCoordinates(this.data.location.lat, this.data.location.long) == false
  ) {
    this.data.location.lat = null;
    this.data.location.long = null;
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
    createdDate: new Date(),
    weather: sanitizeHTML(this.data.weather.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    author: new ObjectID(this.userid),
    location: this.data.location,
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
  console.log("reusable post query called");
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
      console.log("logging collection", fetchCollection("posts"));
      let posts = await fetchCollection("posts")
        .aggregate(aggOperations)
        .toArray();
      posts = posts!.map(function (post: any) {
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
      [{ $match: { _id: id } }],
      visitorId
    );
    if (posts.length) {
      console.log("findsingleByid", posts[0]);
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
        await fetchCollection("posts")?.deleteOne({
          _id: new ObjectID(postIdToDelete),
        });
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
        console.log("search result", posts);
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
      let postCount = await fetchCollection("posts")?.countDocuments({
        author: id,
      });
      resolve(postCount);
    } catch (err) {
      reject(err);
    }
  });
};

Post.prototype.getFeed = async function (id: ObjectID) {
  // Create an array of the user ids that the current user follows
  let followedUsers = await fetchCollection("follows")
    .find({ authorId: new ObjectID(id) })
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

function isValidCoordinates(lat: number | null, long: number | null): boolean {
  if (typeof lat == null || typeof long == null) {
    return false;
  }
  if (typeof lat == "number" && typeof long == "number") {
    return isBetween(lat, -90, 90) && isBetween(long, -180, 180);
  }
  return false;
}

function isBetween(value: number, bottomEnd: number, topEnd: number): boolean {
  return bottomEnd <= value && topEnd >= value;
}
async function getWeather(
  lat: number | null,
  long: number | null
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (typeof lat == "number" && typeof long == "number") {
      try {
        const res: any = await axios.get(
          `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}`
        );
        console.log(res, "response from darksky");
        resolve(res.data.currently.summary);
      } catch (err) {
        console.error("error contacting darksky api", err);
        reject("");
      }
    } else {
      reject("");
    }
  });
}
