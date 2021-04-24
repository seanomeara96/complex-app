import { Collection } from "mongodb";
import db from "../../../db";
/**
 * this is the user input expected from the user
 * username, email and password are all expected to be strings
 */
interface userInput {
  username: string;
  email: string;
  password: string;
}
/**
 * user class starts here
 */
class User {
  avatar?: string;
  data: {
    username: string;
    email: string;
    password: string;
    _id?: string;
  };
  errors: string[];
  usersCollection: Collection;
  /**
   * This is the user model
   * @param data includes information such as username, email & password
   * @param getAvatar when true generates a url for a gravatar pic
   */
  constructor(data: userInput, getAvatar?: boolean) {
    this.data = data;
    this.errors = [];
    this.usersCollection = db.collections.users;
    if (getAvatar == undefined) {
      getAvatar = false;
    }
    if (getAvatar) {
      this.getAvatar();
    }
  }
  /**
   * cleans any inputs submitted by the user
   */
  cleanUp!: () => void;
  /**
   * validates that the information is in the correct shape / is the correct type
   */
  validate!: () => void;
  /**
   * logs the user in
   */
  login!: () => Promise<string>;
  /**
   * registers a new user
   */
  register!: () => Promise<string>;
  /**
   * fetches an avatar for the user from gravatar (if they have one)
   */
  getAvatar!: () => void;
  /**
   * supply an email and this method will search for it in the user database
   * @param email a valid email string
   */
  doesEmailExist!: (email: string) => Promise<boolean>;
  /**
   * supply a username and this method will search the user database for a user with that name
   * @param username valid username string
   */
  findByUserName!: (username: string) => Promise<User | void>;
}
/**
 * exports the User class
 */
export default User;
