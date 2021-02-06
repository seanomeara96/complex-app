import bcrypt from "bcryptjs";
import User from "../../User";
export default function (this: User): Promise<string> {
  console.log("login function was called");
  return new Promise((resolve, reject) => {
    this.cleanUp();
    // findOne() takes two parameters
    // The first is an object that describes what we want to find
    // The second is a function that .findOne() is going to call once the first-
    // operation has had a chance to complete
    // because we dont know how long the search is going to take
    this.usersCollection
      .findOne(
        { username: this.data.username }
        // .findOne() and all of mongodb's other functions will return a promise
      )
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
