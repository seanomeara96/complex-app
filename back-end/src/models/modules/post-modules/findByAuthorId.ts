import Post from "./base";
export default function (authorId: string) {
  return Post.prototype.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } },
  ]);
}