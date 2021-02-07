import { ObjectID } from "mongodb";
import Post, { PostDocument } from "./base";
export default function (
  id: ObjectID,
  visitorId: ObjectID
): Promise<PostDocument> {
  return new Promise(async function (resolve, reject) {
    if (!ObjectID.isValid(id)) {
      console.error("user did not submit a valid user Id");
      //OjectID converts the string into mongodb format
      reject();
      return;
    }
    let posts: PostDocument[] = await Post.prototype.reusablePostQuery(
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
}
