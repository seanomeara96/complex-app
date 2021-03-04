import db from "../../../db";
import User from "../../User";
import { PostDocument } from "./postTypes";
import { ObjectID } from "mongodb";
/**
 * Reusable Post Query takes an array of unique operations depending on your use case
 * And a visitor Id so that it can be determined if the visitor is the author
 * @param uniqueOperations
 * @param visitorId
 */
export default function (
  uniqueOperations: any,
  visitorId?: ObjectID
): Promise<PostDocument[]> {
  console.log("reusable post query called");
  return new Promise(async (resolve, reject) => {
    let aggOperations = uniqueOperations.concat([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDocument",
        },
      },
      {
        $project: {
          title: 1, // 1 is a way to accept the field "as is"
          body: 1,
          createdDate: 1,
          authorId: "$author",
          author: { $arrayElemAt: ["$authorDocument", 0] },
        },
      },
    ]);
    try {
      let posts = await db
        .fetchCollection("posts")
        .aggregate(aggOperations)
        .toArray();
      console.log("posts before its fucked with", posts);
      posts = posts!.map((post: PostDocument) => {
        post.isVisitorOwner = post.authorId.equals(visitorId);
        post.authorId = undefined;
        post.author = {
          username: post.author.username,
          avatar: new User(post.author, true).avatar,
        };
        return post;
      });

      resolve(posts);
    } catch (err) {
      console.log("Error from reusablepost query", err);
      reject(err);
    }
  });
}
