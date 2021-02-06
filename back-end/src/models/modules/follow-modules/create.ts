import { ObjectID } from "mongodb";
import Follow from "../../Follow";
export default async function (this: Follow): Promise<void> {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate("create");
    if (!this.errors.length) {
      await this.followsCollection.insertOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId),
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
}
