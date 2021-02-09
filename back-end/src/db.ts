import dotenv from "dotenv";
import mongodb from "mongodb";
import mongoConfig from "./config/mongoConfig";
dotenv.config();
const client = mongodb.connect(process.env.CONNECTIONSTRING!, mongoConfig);
export default await client;
