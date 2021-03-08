import bcrypt from "bcryptjs";
import User from "../../User";
/**
 * Logs the user in by comparing password to attempted password
 * @param this the User class
 * @returns
 */
export default function (this: User): Promise<string> {
  console.log("login function was called");
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser: any) => {
        // fix this any
        // Hash the login password to check against hashed database password
        // Bcrypt.compareSync takes two parameters
        // 1st is the uhashed password
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          // attempteeduser's data becomes the data for this "user object"
          this.data = attemptedUser;
          this.getAvatar();
          resolve("congrats!!");
        } else {
          reject("invalid username/password");
        }
      })
      .catch(() => {
        reject("please try again later");
      });
  });
}
