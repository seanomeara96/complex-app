import Post from "./_postBase";
import { PostDocument } from "./postTypes";
export default function (searchTerm: string): Promise<PostDocument[]> {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == "string") {
      try {
        console.log("...searching");
        let posts = await Post.prototype.reusablePostQuery([
          { $match: { $text: { $search: searchTerm } } },
          { $sort: { score: { $meta: "textScore" } } },
        ]);
        console.log("search result", posts);
        resolve(posts);
      } catch (err) {
        console.log("error with search", err);
        reject();
      }
    } else {
      reject();
    }
  });
}
