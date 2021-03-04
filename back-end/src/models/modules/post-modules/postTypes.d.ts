/**
 * maybe better to refer to the different post types as inbound vs
 * outbound considering the difficulty with giving this.data 2 different types
 */

export interface postSubmission {
  title: string;
  body: string;
  location: coords;
  weather?: currentWeather;
  createdDate?: Date;
  author?: ObjectID;
}
/**
 * This is the shape of the document stored in mongo
 */
export interface PostDocument {
  _id: ObjectID;
  title: string;
  body: string;
  createdDate: Date;
  weather: currentWeather;
  authorId: ObjectID | undefined;
  location: coords;
  isVisitorOwner?: boolean;
  author?: {
    username: string;
    avatar: string;
  };
}
/**
 * expos the currentWeather interface
 */
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
interface coords {
  lat: number | null;
  long: number | null;
}
