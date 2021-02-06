import { ObjectID } from "mongodb";
import Follow from "../../Follow";
export default async function (this: Follow, action: string) {
  //followed usernmae must exist in database
  let followedAccount = await this.usersCollection.findOne({
    username: this.followedUsername,
  });
  if (followedAccount) {
    this.followedId = followedAccount._id;
  } else {
    this.errors.push("you cannot follow a user that does not exist");
  }
  let doesFollowAlreadyExist = await this.followsCollection.findOne({
    followedId: this.followedId,
    authorId: new ObjectID(this.authorId),
  });
  if (action == "create") {
    if (doesFollowAlreadyExist) {
      this.errors.push("you are already following this user");
    }
  }
  if (action == "delete") {
    if (!doesFollowAlreadyExist) {
      this.errors.push(
        "you cannot stop following someone you do not already follow"
      );
    }
  }
  //shoukld not be able to follow oneself
  if (this.followedId!.equals(this.authorId)) {
    this.errors.push("you cannot follow yourself, idiot");
  }
}
