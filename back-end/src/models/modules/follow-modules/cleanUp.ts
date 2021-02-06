import Follow from "../../Follow";
export default function (this: Follow) {
  if (typeof this.followedUsername != "string") {
    this.followedUsername = "";
  }
}
