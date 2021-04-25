import { ObjectID } from "mongodb";
import Post from "./_postBase";
import { PostDocument } from "./postTypes";
/**
 * Find single post by its ID
 * @param id is the postId you wish to find
 * @param visitorId is the requesting user's id
 */
export default function (id: string, visitorId: string): Promise<PostDocument> {
  const postIdObject = new ObjectID(id);
  const visitorIdObject = new ObjectID(visitorId);
  return new Promise(async (resolve, reject) => {
    if (!ObjectID.isValid(visitorIdObject)) {
      console.log("user did not submit a valid user Id");
      reject();
      return;
    }
    let posts: PostDocument[] = await Post.prototype.reusablePostQuery(
      [{ $match: { _id: postIdObject } }],
      new ObjectID(visitorId)
    );
    if (posts.length) {
      // If this mongodb finds a post (array has more than 0 items) this will return true
      resolve(posts[0]);
    } else {
      reject();
    }
  });
}
