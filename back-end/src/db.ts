// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
dotenv.config();
export let globalClient: MongoClient | undefined;
function connectToDatabase(): Promise<MongoClient> {
  console.log("connecting...");
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
export const setGlobalClient = (client: MongoClient) => {
  console.log("setGlobalClient called...");
  globalClient = client;
  console.log(typeof globalClient);
};
export default connectToDatabase;
