import Follow from "../../Follow";
import User from "../../User";
import { ObjectID } from "mongodb";
export default function (this: Follow, id: string): Promise<Follow[]> {
  return new Promise(async (resolve, reject) => {
    try {
      let followers = await this.followsCollection
        .aggregate([
          { $match: { authorId: new ObjectID(id) } },
          {
            $lookup: {
              from: "users",
              localField: "followedId",
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
        // fix this any
        //create a user
        let user = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      resolve(followers);
    } catch {
      reject();
    }
  });
}
