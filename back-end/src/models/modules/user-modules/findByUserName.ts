import User from "../../User";
export default function (this: User, username: string): Promise<User> {
  return new Promise((resolve, reject) => {
    if (typeof username != "string") {
      reject();
    }
    this.usersCollection
      .findOne({ username: username })
      .then((userDoc: any) => {
        // fix this any
        if (userDoc) {
          userDoc = new User(userDoc, true);
          userDoc = {
            _id: userDoc.data._id,
            username: userDoc.data.username,
            avatar: userDoc.avatar,
          };
          resolve(userDoc);
        } else {
          reject();
        }
      })
      .catch(reject);
  });
}
