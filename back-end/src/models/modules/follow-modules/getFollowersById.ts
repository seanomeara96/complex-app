import Follow from "../../Follow";
import User from "../../User";
import { ObjectId } from "mongodb";
export default function (this: Follow, id: ObjectId): Promise<Follow[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let followers = await this.followsCollection
        .aggregate([
          { $match: { followedId: id } },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "userDoc",
            },
          },
          {
            $project: {
              username: { $arrayElemAt: ["$userDoc.username", 0] },
              email: { $arrayElemAt: ["$userDoc.email", 0] },
            },
          },
        ])
        .toArray();
      followers = followers?.map((follower: any) => {
        //fix this any
        //create a user
        let user: User = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      resolve(followers);
    } catch {
      reject();
    }
  });
}
