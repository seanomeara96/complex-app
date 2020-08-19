import { fetchCollection } from "../db";
import { ObjectID, Collection } from "mongodb";
import User from "./User";

class Follow {
  followedUsername: string;
  authorId: ObjectID;
  errors: string[];
  followedId?: ObjectID;
  followsCollection: Collection;
  usersCollection: Collection;
  constructor(followedUsername: string, authorId: ObjectID) {
    this.followedUsername = followedUsername;
    this.authorId = authorId;
    this.errors = [];
    this.followsCollection = fetchCollection("follows");
    this.usersCollection = fetchCollection("users");
  }

  cleanup!: () => void;
  validate!: (action: string) => Promise<void>;
  create!: () => Promise<void>;
  deleteFollow!: () => Promise<void>;
  isVisitorFollowing!: (
    followedId: ObjectID,
    visitorId: ObjectID
  ) => Promise<boolean>;
  getFollowersById!: (id: ObjectID) => Promise<Follow[]>;
  getFollowingById!: (id: ObjectID) => Promise<Follow[]>;
  countFollowersById!: (id: ObjectID) => Promise<number>;
  countFollowingById!: (id: ObjectID) => Promise<number>;
}
// class ends
Follow.prototype.cleanup = function () {
  if (typeof this.followedUsername != "string") {
    this.followedUsername = "";
  }
};
Follow.prototype.validate = async function (action: string) {
  //followed usernmae must exist in database
  let followedAccount = await this.usersCollection.findOne({
    username: this.followedUsername,
  });
  if (followedAccount) {
    this.followedId = followedAccount._id;
  } else {
    this.errors.push("you cannot follow a user that does not exist");
  }
  let doesFollowAlreadyExist = await this.followsCollection.findOne({
    followedId: this.followedId,
    authorId: new ObjectID(this.authorId),
  });
  if (action == "create") {
    if (doesFollowAlreadyExist) {
      this.errors.push("you are already following this user");
    }
  }
  if (action == "delete") {
    if (!doesFollowAlreadyExist) {
      this.errors.push(
        "you cannot stop following someone you do not already follow"
      );
    }
  }
  //shoukld not be able to follow oneself
  if (this.followedId!.equals(this.authorId)) {
    this.errors.push("you cannot follow yourself, idiot");
  }
};
Follow.prototype.create = async function () {
  return new Promise(async (resolve, reject) => {
    this.cleanup();
    await this.validate("create");
    if (!this.errors.length) {
      await this.followsCollection.insertOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId),
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

Follow.prototype.deleteFollow = async function () {
  return new Promise(async (resolve, reject) => {
    this.cleanup();
    await this.validate("delete");
    if (!this.errors.length) {
      await this.followsCollection.deleteOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId),
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};
Follow.prototype.isVisitorFollowing = async function (
  followedId: ObjectID,
  visitorId: ObjectID
) {
  let followDoc = await this.followsCollection.findOne({
    followedId: followedId,
    authorId: new ObjectID(visitorId),
  });
  if (followDoc) {
    return true;
  } else {
    return false;
  }
};
Follow.prototype.getFollowersById = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let followers = await this.followsCollection
        .aggregate([
          { $match: { followedId: id } },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "userDoc",
            },
          },
          {
            $project: {
              username: { $arrayElemAt: ["$userDoc.username", 0] },
              email: { $arrayElemAt: ["$userDoc.email", 0] },
            },
          },
        ])
        .toArray();
      followers = followers?.map(function (follower: any) {
        //fix this any
        //create a user
        let user: User = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      resolve(followers);
    } catch {
      reject();
    }
  });
};
Follow.prototype.getFollowingById = function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let followers = await this.followsCollection
        .aggregate([
          { $match: { authorId: id } },
          {
            $lookup: {
              from: "users",
              localField: "followedId",
              foreignField: "_id",
              as: "userDoc",
            },
          },
          {
            $project: {
              username: { $arrayElemAt: ["$userDoc.username", 0] },
              email: { $arrayElemAt: ["$userDoc.email", 0] },
            },
          },
        ])
        .toArray();
      followers = followers?.map(function (follower: any) {
        // fix this any
        //create a user
        let user = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      resolve(followers);
    } catch {
      reject();
    }
  });
};
Follow.prototype.countFollowersById = function (id: ObjectID) {
  return new Promise(async (resolve, reject) => {
    let followerCount = await this.followsCollection.countDocuments({
      followedId: id,
    });
    resolve(followerCount);
  });
};
Follow.prototype.countFollowingById = function (id) {
  return new Promise(async (resolve, reject) => {
    let count = await this.followsCollection.countDocuments({
      authorId: id,
    });
    resolve(count);
  });
};
export default Follow;
