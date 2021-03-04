import { Collection, ObjectID } from "mongodb";
import db from "../../../db";
import { postSubmission, PostDocument } from "./postTypes";
/**
 * Instantiates a Post model
 * @param data conains, title, body and author
 * @param userid is the author's Id
 * @param requestedPostId is the postId in the event that a post needs to be found, updated, deleted etc
 */
class Post {
  data: postSubmission;
  errors: string[];
  userid: string;
  requestedPostId?: string;
  isVisitorOwner?: boolean;
  postsCollection: Collection;
  followsCollection: Collection;
  // this.data can will either be the object passed by req.body
  // or it will be whatever shape results in running the cleanup command
  constructor(data: postSubmission, userid: string, requestedPostId?: string) {
    this.data = data;
    this.errors = [];
    this.userid = userid;
    this.requestedPostId = requestedPostId;
    this.postsCollection = db.fetchCollection("posts");
    this.followsCollection = db.fetchCollection("follows");
  }
  /**
   * Cleans, validates and transforms post submission and stores it in the database
   * @param this Post object
   */
  create!: () => Promise<string>;
  /**
   * Updates the post in the database
   * @param this Post object
   */
  update!: () => Promise<string>;
  /**
   *
   */
  actuallyUpdate!: () => Promise<string>;
  /**
   * Sanitizes HTML, ensures submission fields are correct types and that location is valid
   * @param this Post object
   */
  cleanUp!: () => void;
  /**
   * Generates errors based on lack of body/title
   * @param this Post object
   */
  validate!: () => void;
  /**
   * Deletes a post by Id provided that the request is coming from the author
   * @param postIdToDelete
   * @param currentUserId
   */
  deletePost!: (postIdToDelete: string, currentUserId: string) => Promise<void>;
  /**
   * Find single post by its ID
   * @param id is the postId you wish to find
   * @param visitorId is the requesting user's id
   */
  findSingleById!: (id: string, visitorId: string) => Promise<PostDocument>;
  /**
   * Reusable Post Query takes an array of unique operations depending on your use case
   * And a visitor Id so that it can be determined if the visitor is the author
   * @param uniqueOperations
   * @param visitorId
   */
  reusablePostQuery!: (
    uniqueOperations: any,
    visitorId?: ObjectID
  ) => Promise<PostDocument[]>;
  /**
   * author is a user/author ObjectId
   * @param authorId is a string
   */
  findByAuthorId!: (authorId: string) => Promise<PostDocument[]>;
  /**
   * Searches posts collection for the provided search term
   * @param searchTerm
   */
  search!: (searchTerm: string) => Promise<PostDocument[]>;
  /**
   * Counts posts by author.
   * @param id is authorId
   */
  countPostsByAuthor!: (id: ObjectID) => Promise<number>;
  /**
   * Fetches user's homefeed
   * @param id is the user's Id
   */
  getFeed!: (id: ObjectID) => Promise<PostDocument[]>;
}
/**
 * expose the Post Class
 */
export default Post;
