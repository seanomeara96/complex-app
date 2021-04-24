import md5 from "md5";
import User from "../../User";
/**
 * Gets user's avatar. If they have gravatar.
 * @param this
 */
export default function (this: User) {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
}
