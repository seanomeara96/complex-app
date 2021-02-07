import { ObjectID } from "mongodb";
import db from "../../../db";
export default function (id: ObjectID): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      let postCount = await db.fetchCollection("posts")?.countDocuments({
        author: id,
      });
      resolve(postCount);
    } catch (err) {
      reject(err);
    }
  });
}
