import Express, { Request } from "express";
import { ObjectID, ObjectId } from "mongodb";
export declare global {
  namespace Express {
    interface Request {
      visitorId: string | undefined;
      isVisitorsProfile: boolean;
      isFollowing: boolean;
      postCount: number;
      followerCount: number;
      followingCount: number;
      selectedProfile: any;
      profileUser: any;
      session: any;
    }
  }
  interface PostSchema {
    _id: ObjectID;
    title: string;
    body: string;
    createdDate: Date;
    author: ObjectID;
  }
  interface UserSchema {
    _id: ObjectID;
    username: string;
    email: string;
    password: string;
  }
  interface FollowSchema {
    _id: ObjectID;
    followedId: ObjectID;
    authorId: ObjectId;
  }
}
