import Follow from "../../Follow";
import { ObjectID } from "mongodb";
export default async function (this: Follow): Promise<void> {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate("delete");
    if (!this.errors.length) {
      await this.followsCollection.deleteOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId),
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
}
