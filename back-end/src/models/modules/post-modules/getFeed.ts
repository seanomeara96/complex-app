import { ObjectID } from "mongodb";
import { fetchCollection } from "../../../db";
import Post from "./base";
export default async function (id: ObjectID) {
  // Create an array of the user ids that the current user follows
  let followedUsers = await fetchCollection("follows")
    .find({ authorId: new ObjectID(id) })
    .toArray();
  followedUsers = followedUsers?.map(function (followDoc: any) {
    return followDoc.followedId;
  });
  // Look for posts where author is in the above array of followed users
  return Post.prototype.reusablePostQuery([
    { $match: { author: { $in: followedUsers } } },
    { $sort: { createdDate: -1 } },
  ]);
}
