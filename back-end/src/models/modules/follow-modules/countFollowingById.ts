import Follow from "../../Follow";
import { ObjectID } from "mongodb";
export default function (this: Follow, id: string): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let count = await this.followsCollection.countDocuments({
      authorId: new ObjectID(id),
    });
    resolve(count);
  });
}
