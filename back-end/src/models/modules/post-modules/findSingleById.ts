import { ObjectID } from "mongodb";
import Post from "./base";
export default function (id: ObjectID, visitorId: ObjectID): Promise<Post> {
  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      //OjectID converts the string into mongodb format
      reject();
      return;
    }
    let posts: Post[] = await Post.prototype.reusablePostQuery(
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
