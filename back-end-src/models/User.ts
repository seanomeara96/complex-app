const bcrypt = require("bcryptjs");
const usersCollection = require("../db").db().collection("users");
const validator = require("validator");
const md5 = require("md5"); // Gravatar uses md5 hashing
interface userData {
  username: string;
  email: string;
  password: string;
}
class User {
  avatar?: string;
  data: userData;
  errors: string[];
  constructor(data: userData, getAvatar: boolean) {
    this.data = data;
    this.errors = [];
    if (getAvatar == undefined) {
      getAvatar = false;
    }
    if (getAvatar) {
      this.getAvatar();
    }
  }
  cleanUp!: () => void;
  validate!: () => void;
  login!: () => void;
  register!: () => void;
  getAvatar!: () => void;
}

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};
User.prototype.validate = function () {
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
    if (this.data.password.length > 0 && this.data.password.length < 12) {
      this.errors.push("password must be at least 12 characters");
    }
    if (this.data.password.length > 50) {
      this.errors.push("password cannot exceed 50 chracters");
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("username must be atleast 3 characters");
    }
    if (this.data.username.length > 30) {
      this.errors.push("username cannot exceed 30 characters");
    }

    //Only if the username is valid then check to see if it's already taken
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username)
    ) {
      let usernameExists = await usersCollection.findOne({
        username: this.data.username,
      });
      //usersCollection is our mongodb users collection
      if (usernameExists) {
        this.errors.push("this username is taken bitch");
      }
    }
    //Only if the email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email,
      });
      //usersCollection is our mongodb users collection
      if (emailExists) {
        this.errors.push("this email is being is used you fuck");
      }
    }
    resolve();
  });
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    // findOne() takes two parameters
    // The first is an object that describes what we want to find
    // The second is a function that .findOne() is going to call once the first-
    // operation has had a chance to complete
    // because we dont know how long the search is going to take
    usersCollection
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
};
User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // Step no.1 validate user data
    this.cleanUp();
    await this.validate();
    // If there are no validation errors save the user data into a database
    if (!this.errors.length) {
      // Hash user password
      let salt = bcrypt.genSaltSync(10);
      // Overide the users password
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      // Adds the new user to the database
      await usersCollection.insertOne(this.data);
      this.getAvatar();
      resolve();
    } else {
      reject(this.errors);
    }
  });
};
User.prototype.getAvatar = function () {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
};

export const findByUserName = function (username: string) {
  return new Promise(function (resolve, reject) {
    if (typeof username != "string") {
      // Dont allow people to pass objects onto mongodb
      reject();
    }
    // Object is what we want to find in our database
    usersCollection
      .findOne({ username: username })
      .then(function (userDoc: any) {
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
          reject();
        }
      })
      .catch(function () {
        reject();
      });
  });
};
export const doesEmailExist = function (email: string) {
  return new Promise(async function (resolve, reject) {
    if (typeof email != "string") {
      resolve(false);
      return;
    }
    let user = await usersCollection.findOne({ email: email });
    if (user) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
export default User;
