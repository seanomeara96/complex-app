import Post from "./_postBase";
/**
 * author is a user/author ObjectId
 */
export default function (author: string) {
  return Post.prototype.reusablePostQuery([
    { $match: { author } },
    { $sort: { createdDate: -1 } },
  ]);
}
