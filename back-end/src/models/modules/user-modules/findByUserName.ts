import User from "../../User";
import db from "../../../db";
/**
 * Supply username and get userdoc in return if exists
 * @param this User Class
 * @param username String - Unique Username
 * @returns Promise => userdoc or nothing
 */
export default function (this: User, username: string): Promise<User | void> {
  return new Promise((resolve, reject) => {
    if (typeof username != "string") {
      reject(typeof username);
    }
    db.collections.users
      .findOne({ username })
      .then((userDoc: any) => {
        // fix this any
        if (userDoc) {
          userDoc = new User(userDoc, true);
          userDoc = {
            _id: userDoc.data._id,
            username: userDoc.data.username,
            avatar: userDoc.avatar,
          };
          resolve(userDoc);
        } else {
          resolve();
        }
      })
      .catch((err: any) => reject(err));
  });
}
