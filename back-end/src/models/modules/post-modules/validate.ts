import Post from "./_postBase";
/**
 * Generates errors based on lack of body/title
 * @param this Post object
 */
export default function (this: Post): void {
  if (this.data.title == "") {
    this.errors.push("you must provide a title");
  }
  if (this.data.body == "") {
    this.errors.push("you must provide post content");
  }
}
