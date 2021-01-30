import Post from "./Post";
import { fetchCollection } from "../../db";
import axios from "axios";

export default function (post: Post) {
  console.log(post.data, "post is the data in the Post model");
  return new Promise(async (resolve, reject) => {
    post.data.weather = await getWeather(
      post.data.location.lat,
      post.data.location.lat
    );
    post.cleanUp();
    post.validate();
    if (!post.errors.length) {
      // Save post to database
      fetchCollection("posts")
        ?.insertOne(post.data)
        .then((info: any) => {
          // fix post
          resolve(info.ops[0]._id);
        })
        .catch(() => {
          post.errors.push("please try again later");
          reject(post.errors);
        });
    } else {
      //reject
      reject(post.errors);
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
        console.log(res, "response from darksky");
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

export interface currentWeather {
  time: number;
  summary: string;
  icon: string;
  nearestStormDistance: number;
  nearestStormBearing: number;
  precipIntensity: number;
  precipProbability: number;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}
