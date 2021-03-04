import Post from "./_postBase";
import axios from "axios";
import { currentWeather } from "./postTypes";
/**
 * Cleans, validates and transforms post submission and stores it in the database
 * @param this Post object
 */
export default function (this: Post): Promise<string> {
  console.log(this.data, "post is the data in the Post model");
  return new Promise(async (resolve, reject) => {
    this.data.weather = await getWeather(
      this.data.location.lat,
      this.data.location.lat
    );
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save post to database
      console.log(this.data);
      this.postsCollection
        .insertOne(this.data)
        .then((info: any) => {
          // fix post
          resolve(info.ops[0]._id);
        })
        .catch(() => {
          this.errors.push("please try again later");
          reject(this.errors);
        });
    } else {
      //reject
      reject(this.errors);
    }
  });
}
async function getWeather(
  lat: number | null,
  long: number | null
): Promise<currentWeather> {
  return new Promise(async (resolve, reject) => {
    if (typeof lat == "number" && typeof long == "number") {
      try {
        const res: any = await axios.get(
          `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}`
        );
        resolve(res.data.currently);
      } catch (err) {
        console.error("error contacting darksky api", err);
        reject();
      }
    } else {
      reject();
    }
  });
}
