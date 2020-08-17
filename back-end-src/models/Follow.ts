import db from "../db";
import mongodb from "mongodb";
import User from "./User";
const usersCollection = db.db().collection("users");
const followsCollection = db.db().collection("follows");
const ObjectID = mongodb.ObjectID;

class Follow {
  followedUsername: string;
  authorId: string;
  errors: string[];

  constructor(followedUsername: string, authorId: string) {
    this.followedUsername = followedUsername;
    this.authorId = authorId;
    this.errors = [];
  }

  cleanup() {
    if (typeof this.followedUsername != "string") {
      this.followedUsername = "";
    }
  }
  validate(action) {
    //followed usernmae must exist in database
    let followedAccount = await usersCollection.findOne({
      username: this.followedUsername,
    });
    if (followedAccount) {
      this.followedId = followedAccount._id;
    } else {
      this.errors.push("you cannot follow a user that does not exist");
    }
    let doesFollowAlreadyExist = await followsCollection.findOne({
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
    if (this.followedId.equals(this.authorId)) {
      this.errors.push("you cannot follow yourself, idiot");
    }
  }
  async create() {
    return new Promise(async (resolve, reject) => {
      this.cleanup();
      await this.validate("create");
      if (!this.errors.length) {
        await followsCollection.insertOne({
          followedId: this.followedId,
          authorId: new ObjectID(this.authorId),
        });
        resolve();
      } else {
        reject(this.errors);
      }
    });
  }
  async delete() {
    return new Promise(async (resolve, reject) => {
      this.cleanup();
      await this.validate("delete");
      if (!this.errors.length) {
        await followsCollection.deleteOne({
          followedId: this.followedId,
          authorId: new ObjectID(this.authorId),
        });
        resolve();
      } else {
        reject(this.errors);
      }
    });
  }
  async isVisitorFollowing(followedId: string, visitorId: string) {
    let followDoc = await followsCollection.findOne({
      followedId: followedId,
      authorId: new ObjectID(visitorId),
    });
    if (followDoc) {
      return true;
    } else {
      return false;
    }
  }
  getFollowersById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let followers = await followsCollection
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
        followers = followers.map(function (follower) {
          //create a user
          let user = new User(follower, true);
          return { username: follower.username, avatar: user.avatar };
        });
        resolve(followers);
      } catch {
        reject();
      }
    });
  }
  getFollowingById(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let followers = await followsCollection
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
        followers = followers.map(function (follower) {
          //create a user
          let user = new User(follower, true);
          return { username: follower.username, avatar: user.avatar };
        });
        resolve(followers);
      } catch {
        reject();
      }
    });
  }
  countFollowersById(id: string) {
    return new Promise(async (resolve, reject) => {
      let followerCount = await followsCollection.countDocuments({
        followedId: id,
      });
      resolve(followerCount);
    });
  }
  countFollowingById(id: string) {
    return new Promise(async (resolve, reject) => {
      let count = await followsCollection.countDocuments({ authorId: id });
      resolve(count);
    });
  }
}

export default Follow;
