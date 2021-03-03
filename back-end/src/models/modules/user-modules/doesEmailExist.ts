import User from "../../User";
export default function (this: User, email: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (typeof email != "string") {
      resolve(false);
      return;
    }
    let user = await this.usersCollection.findOne({ email });
    if (user) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
