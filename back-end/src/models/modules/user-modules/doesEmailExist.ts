import User from "../../User";
/**
 * supply an email and this method will search for it in the user database
 * @param this User class
 * @param email a valid email string
 */
export default function (this: User, email: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (typeof email != "string") {
      resolve(false);
      return;
    }
    let user = await this.usersCollection!.findOne({ email });
    if (user) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
