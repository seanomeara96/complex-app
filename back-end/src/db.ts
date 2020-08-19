// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import server from "./app";
dotenv.config();

function connectToDatabase(): Promise<MongoClient> {
  return new Promise(async (resolve, reject) => {
    try {
      let res: MongoClient = await mongodb.connect(
        process.env.CONNECTIONSTRING!,
        {
          useUnifiedTopology: true,
        }
      );
      console.log("connected");
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export default connectToDatabase;
