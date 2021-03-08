import { ObjectID, Collection } from "mongodb";
import db from "../../../db";
class Follow {
  followedUsername: string;
  authorId: ObjectID;
  errors: string[];
  followedId?: ObjectID;
  followsCollection: Collection;
  usersCollection: Collection;
  /**
   * This is the follows model
   * @param followedUsername userIds are not sent to client so must use uniques username and fecth Id
   * @param authorId id of the person who is creating the "follow"
   */
  constructor(followedUsername: string, authorId: string) {
    this.followedUsername = followedUsername;
    this.authorId = new ObjectID(authorId);
    this.errors = [];
    this.followsCollection = db.fetchCollection("follows");
    this.usersCollection = db.fetchCollection("users");
  }
  /**
   * Cleans up the paramters in order to ensure nothing sinister is afoot
   */
  cleanUp!: () => void;
  /**
   * checking and proving the validity of the supplied arguments
   */
  validate!: (action: string) => Promise<void>;
  /**
   * creates the relationship and stores it in the database
   */
  create!: () => Promise<void>;
  /**
   * removes the record of the relationship from the datbase
   */
  deleteFollow!: () => Promise<void>;
  /**
   * checks to see if a relationship between visitor and visitee exists
   */
  isVisitorFollowing!: (
    followedId: string,
    visitorId: string
  ) => Promise<boolean>;
  /**
   * returns an array of followers based on an ID
   */
  getFollowersById!: (id: string) => Promise<Follow[]>;
  /**
   * returns an array of users a person is following based on their ID
   */
  getFollowingById!: (id: string) => Promise<Follow[]>;
  /**
   * returns the number of users the person is following by their ID
   */
  countFollowersById!: (id: string) => Promise<number>;
  /**
   * returns the number if users the person is followed by based on their ID
   */
  countFollowingById!: (id: string) => Promise<number>;
}
export default Follow;
