import { ObjectID } from "mongodb";
import Post from "./_postBase";
import db from "../../../db";
/**
 * Deletes a post by Id provided that the request is coming from the author
 * @param postIdToDelete
 * @param currentUserId
 */
export default function (
  postIdToDelete: string,
  currentUserId: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.prototype.findSingleById(
        postIdToDelete,
        currentUserId
      );
      if (post.isVisitorOwner) {
        // where is this coming from?
        // where am i setting isVisitorOwner?
        await db.fetchCollection("posts").deleteOne({
          _id: new ObjectID(postIdToDelete),
        });
        resolve();
      } else {
        reject();
      }
    } catch (err) {
      console.log(err);
      reject();
    }
  });
}
