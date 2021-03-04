import Post from "./_postBase";
import { ObjectID } from "mongodb";
/**
 * Updates the post in the database
 * @param this Post object
 */
export default function (this: Post): Promise<string> {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await this.postsCollection.findOneAndUpdate(
        { _id: new ObjectID(this.requestedPostId) },
        { $set: { title: this.data.title, body: this.data.body } }
      );
      resolve("success");
    } else {
      resolve("failure");
    }
  });
}
