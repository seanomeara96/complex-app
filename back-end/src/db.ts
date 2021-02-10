// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb from "mongodb";
import mongoConfig from "./config/mongoConfig";
dotenv.config();
const client = async () =>
  await mongodb.connect(process.env.CONNECTIONSTRING!, mongoConfig);
export default client;
