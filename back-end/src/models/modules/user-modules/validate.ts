import validator from "validator";
import User from "../../User";
/**
 * Validates user inputs
 * @param this
 * @returns
 */
export default function (this: User): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("Provide a username...idiot");
    }
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      this.errors.push("usernames can only contain letters and numbers");
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("A valid email address please, you moron");
    }
    if (this.data.password == "") {
      this.errors.push("Make a password for yourself");
    }
    if (this.data.password!.length > 0 && this.data.password!.length < 12) {
      this.errors.push("password must be at least 12 characters");
    }
    if (this.data.password!.length > 50) {
      this.errors.push("password cannot exceed 50 chracters");
    }
    if (this.data.username!.length > 0 && this.data.username!.length < 3) {
      this.errors.push("username must be atleast 3 characters");
    }
    if (this.data.username!.length > 30) {
      this.errors.push("username cannot exceed 30 characters");
    }

    //Only if the username is valid then check to see if it's already taken
    if (
      this.data.username!.length > 2 &&
      this.data.username!.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      let usernameExists = await this.usersCollection.findOne({
        username: this.data.username,
      });
      //usersCollection is our mongodb users collection
      if (usernameExists) {
        this.errors.push("this username is taken bitch");
      }
    }
    //Only if the email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await this.usersCollection.findOne({
        email: this.data.email,
      });
      //usersCollection is our mongodb users collection
      if (emailExists) {
        this.errors.push("this email is being is used you fuck");
      }
    }
    resolve(true);
  });
}
