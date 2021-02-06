import { ObjectID } from "mongodb";
import { fetchCollection } from "../../../db";
export default function (id: ObjectID): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      let postCount = await fetchCollection("posts")?.countDocuments({
        author: id,
      });
      resolve(postCount);
    } catch (err) {
      reject(err);
    }
  });
}
