import Post from "./base";
import { fetchCollection } from "../../../db";
import { ObjectID } from "mongodb";
export default function (this: Post): Promise<string> {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await fetchCollection("posts")?.findOneAndUpdate(
        { _id: new ObjectID(this.requestedPostId) },
        { $set: { title: this.data.title, body: this.data.body } }
      );
      resolve("success");
    } else {
      resolve("failure");
    }
  });
}
