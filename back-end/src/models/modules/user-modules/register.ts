import bcrypt from "bcryptjs";
import User from "../../User";
/**
 * Registers a new user.
 * @param this
 * @returns
 */
export default function (this: User): Promise<string> {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate(); // should this be an async function?
    if (!this.errors.length) {
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await this.usersCollection.insertOne(this.data);
      this.getAvatar();
      resolve("User successfully registered");
    } else {
      reject(this.errors);
    }
  });
}
