import Post, { currentWeather } from "./Post";
import { fetchCollection } from "../../db";
import axios from "axios";
export default (param: any) => {
  return function (): Promise<string> {
    console.log(param.data, "post is the data in the Post model");
    return new Promise(async (resolve, reject) => {
      param.data.weather = await getWeather(
        param.data.location.lat,
        param.data.location.lat
      );
      param.cleanUp();
      param.validate();
      if (!param.errors.length) {
        // Save post to database
        fetchCollection("posts")
          ?.insertOne(param.data)
          .then((info: any) => {
            // fix post
            resolve(info.ops[0]._id);
          })
          .catch(() => {
            param.errors.push("please try again later");
            reject(param.errors);
          });
      } else {
        //reject
        reject(param.errors);
      }
    });
  };
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
};
