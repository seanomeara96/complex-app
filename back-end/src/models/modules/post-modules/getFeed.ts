import { ObjectID } from "mongodb";
import db from "../../../db";
import Post from "./_postBase";
export default async function (this: Post, id: ObjectID) {
  // Create an array of the user ids that the current user follow
  let followedUsers;
  try {
    followedUsers = await db
      .fetchCollection("follows")
      .find({ authorId: new ObjectID(id) })
      .toArray();
  } catch (err) {
    console.error(err);
  }
  followedUsers = followedUsers?.map(function (followDoc: any) {
    return followDoc.followedId;
  });
  // Look for posts where author is in the above array of followed users
  return Post.prototype.reusablePostQuery([
    { $match: { author: { $in: followedUsers } } },
    { $sort: { createdDate: -1 } },
  ]);
}
