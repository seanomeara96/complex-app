import { ObjectID } from "mongodb";
import Follow from "../../Follow";
export default async function (
  this: Follow,
  followedId: ObjectID,
  visitorId: ObjectID
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
