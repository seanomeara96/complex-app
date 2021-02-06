import Post from "./base";
export default function (this: Post) {
  if (this.data.title == "") {
    this.errors.push("you must provide a title");
  }
  if (this.data.body == "") {
    this.errors.push("you must provide post content");
  }
}
