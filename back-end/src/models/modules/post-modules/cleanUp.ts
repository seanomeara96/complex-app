import Post from "./_postBase";
import sanitizeHTML from "sanitize-html";
import { ObjectID } from "mongodb";
/**
 * Sanitizes HTML, ensures submission fields are correct types and that location is valid
 * @param this Post object
 */
export default function (this: Post) {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }
  if (
    typeof this.data.location?.lat != "number" ||
    typeof this.data.location.long != "number" ||
    isValidCoordinates(this.data.location.lat, this.data.location.long) == false
  ) {
    this.data.location.lat = null;
    this.data.location.long = null;
  }

  // Get rid of any bogus properties
  this.data = {
    title: sanitizeHTML(this.data.title.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    body: sanitizeHTML(this.data.body.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    createdDate: new Date(),
    weather: this.data.weather,
    author: new ObjectID(this.userid),
    location: this.data.location,
  };
}
const isBetween = (value: number, bottomEnd: number, topEnd: number): boolean =>
  bottomEnd <= value && topEnd >= value;
function isValidCoordinates(lat: number | null, long: number | null): boolean {
  if (typeof lat == null || typeof long == null) return false;
  if (typeof lat == "number" && typeof long == "number")
    return isBetween(lat, -90, 90) && isBetween(long, -180, 180);
  return false;
}
