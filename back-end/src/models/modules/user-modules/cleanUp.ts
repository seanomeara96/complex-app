import User from "../../User";
/**
 * Cleans up the data that was submitted.
 * Everything should be a string so anything that isnt is set to an empty string
 *
 * Whitespace and uppercasing is also removed except for in the password
 *
 * @param this User class
 */
export default function (this: User) {
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
}
