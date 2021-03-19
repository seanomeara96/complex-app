import { ObjectID } from "mongodb";
import Follow from "../../Follow";
export default async function (
  this: Follow,
  followedId: string,
  visitorId: string
) {
  let followDoc = await this.followsCollection.findOne({
    followedId: followedId,
    authorId: new ObjectID(visitorId),
  });
  if (followDoc) {
    return true;
  } else {
    return false;
  }
}
