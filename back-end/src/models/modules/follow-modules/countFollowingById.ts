import Follow from "../../Follow";
import { ObjectId } from "mongodb";
export default function (this: Follow, id: ObjectId): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let count = await this.followsCollection.countDocuments({
      authorId: id,
    });
    resolve(count);
  });
}
