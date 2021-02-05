import { ObjectID } from "mongodb";
import create from "./create";
import update from "./update";
import actuallyUpdate from "./actuallyUpdate";
import cleanUp from "./cleanUp";
import validate from "./validate";
import reusablePostQuery from "./reusablePostQuery";
import findSingleById from "./findSingleById";
import findByAuthorId from "./findByAuthorId";
import deletePost from "./deletePost";
import search from "./search";
import countPostsByAuthor from "./countPostsByAuthor";
import getFeed from "./getFeed";
class Post {
  data: postData;
  errors: string[];
  userid: ObjectID;
  requestedPostId?: ObjectID;
  isVisitorOwner?: boolean;
  constructor(data: postData, userid: ObjectID, requestedPostId?: ObjectID) {
    this.data = data;
    this.errors = [];
    this.userid = userid;
    this.requestedPostId = requestedPostId;
  }
  create!: () => Promise<string>;
  update!: () => Promise<string>;
  actuallyUpdate!: () => Promise<string>;
  cleanUp!: () => void;
  validate!: () => void;
  deletePost!: (
    postIdToDelete: ObjectID,
    currentUserId: ObjectID
  ) => Promise<string>;
  findSingleById!: (id: ObjectID, visitorId: ObjectID) => Promise<Post>;
  reusablePostQuery!: (
    uniqueOperations: any,
    visitorId?: ObjectID
  ) => Promise<Post[]>;
  findByAuthorId!: (authorId: string) => Promise<Post[]>;
  search!: (searchTerm: string) => Promise<Post[]>;
  countPostsByAuthor!: (id: ObjectID) => Promise<number>;
  getFeed!: (id: ObjectID) => Promise<Post[]>;
}
Post.prototype.create = create;
Post.prototype.update = update;
Post.prototype.actuallyUpdate = actuallyUpdate;
Post.prototype.cleanUp = cleanUp;
Post.prototype.validate = validate;
Post.prototype.reusablePostQuery = reusablePostQuery;
Post.prototype.findSingleById = findSingleById;
Post.prototype.findByAuthorId = findByAuthorId;
Post.prototype.deletePost = deletePost;
Post.prototype.search = search;
Post.prototype.countPostsByAuthor = countPostsByAuthor;
Post.prototype.getFeed = getFeed;
export default Post;

interface postData {
  title: string;
  body: string;
  location: {
    lat: number | null;
    long: number | null;
  };
  weather: currentWeather;
  createdDate?: Date;
  author?: ObjectID;
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
