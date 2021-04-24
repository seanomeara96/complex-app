import User from "../../User";
import db from "../../../db";
/**
 * supply an email and this method will search for it in the user database
 * @param this User class
 * @param email a valid email string
 */
export default function (this: User, email: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (typeof email != "string") {
      resolve(false);
    }
    try {
      let user = await db.collections.users.findOne({ email });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
