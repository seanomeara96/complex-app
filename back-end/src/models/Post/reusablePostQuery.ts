import { fetchCollection } from "../../db";
import User from "../User";
import Post from "./Post";
import { ObjectID } from "mongodb";
export default function (
  uniqueOperations: any,
  visitorId?: ObjectID
): Promise<Post[]> {
  console.log("reusable post query called");
  return new Promise(async function (resolve, reject) {
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
      console.log("logging collection", fetchCollection("posts"));
      let posts = await fetchCollection("posts")
        .aggregate(aggOperations)
        .toArray();
      posts = posts!.map(function (post: any) {
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
