import { Collection, ObjectID } from "mongodb";
import db from "../../../db";
class Post {
  data: PostDocument;
  errors: string[];
  userid: string;
  requestedPostId?: string;
  isVisitorOwner?: boolean;
  postsCollection: Collection;
  followsCollection: Collection;
  constructor(data: PostDocument, userid: string, requestedPostId?: string) {
    this.data = data;
    this.errors = [];
    this.userid = userid;
    this.requestedPostId = requestedPostId;
    this.postsCollection = db.fetchCollection("posts");
    this.followsCollection = db.fetchCollection("follows");
  }
  create!: () => Promise<string>;
  update!: () => Promise<string>;
  actuallyUpdate!: () => Promise<string>;
  cleanUp!: () => void;
  validate!: () => void;
  deletePost!: (
    postIdToDelete: string,
    currentUserId: string
  ) => Promise<string>;
  findSingleById!: (id: string, visitorId: string) => Promise<PostDocument>;
  reusablePostQuery!: (
    uniqueOperations: any,
    visitorId?: ObjectID
  ) => Promise<PostDocument[]>;
  findByAuthorId!: (authorId: string) => Promise<PostDocument[]>;
  search!: (searchTerm: string) => Promise<PostDocument[]>;
  countPostsByAuthor!: (id: ObjectID) => Promise<number>;
  getFeed!: (id: ObjectID) => Promise<PostDocument[]>;
}

export default Post;
export interface PostDocument {
  title: string;
  body: string;
  location: {
    lat: number | null;
    long: number | null;
  };
  weather: currentWeather;
  createdDate?: Date;
  author?: ObjectID;
  isVisitorOwner: boolean;
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
