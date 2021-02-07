import { Collection } from "mongodb";
import db from "../../../db";
interface userInput {
  username: string;
  email: string;
  password: string;
}
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
  constructor(data: userInput, getAvatar?: boolean) {
    this.data = { ...data };
    this.errors = [];
    this.usersCollection = db.fetchCollection("users");
    if (getAvatar == undefined) {
      getAvatar = false;
    }
    if (getAvatar) {
      this.getAvatar();
    }
  }
  cleanUp!: () => void;
  validate!: () => void;
  login!: () => Promise<string>;
  register!: () => Promise<string>;
  getAvatar!: () => void;
  findByUserName!: (username: string) => Promise<User>;
  doesEmailExist!: (email: string) => Promise<boolean>;
}
export default User;
