import md5 from "md5";
import User from "../../User";
export default function (this: User) {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
}
