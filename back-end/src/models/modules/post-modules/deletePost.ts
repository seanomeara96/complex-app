import { ObjectID } from "mongodb";
import Post from "./base";
import { fetchCollection } from "../../../db";
export default function (
  postIdToDelete: ObjectID,
  currentUserId: ObjectID
): Promise<string> {
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
        resolve("deleted");
      } else {
        reject("problem deleting this post"); // update these messages
      }
    } catch {
      reject("problem deleting this post");
    }
  });
}
