import Post from "./Post";
export default function (this: Post): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.prototype.findSingleById(
        this.requestedPostId!,
        this.userid
      );
      if (post.isVisitorOwner) {
        // Update the db
        let status = await this.actuallyUpdate();
        resolve(status);
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
}
