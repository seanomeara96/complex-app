import { ObjectID } from "mongodb";
import Follow from "../../Follow";
export default function (this: Follow, id: ObjectID): Promise<number> {
  return new Promise(async (resolve, reject) => {
    let followerCount = await this.followsCollection.countDocuments({
      followedId: id,
    });
    resolve(followerCount);
  });
}
