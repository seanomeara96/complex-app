import { ObjectID, Collection } from "mongodb";
import { fetchCollection } from "../../../db";
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

  cleanUp!: () => void;
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
export default Follow;
