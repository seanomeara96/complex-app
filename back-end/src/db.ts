// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
dotenv.config();
export let globalClient: MongoClient;
function connectToDatabase(): Promise<MongoClient> {
  return new Promise(async (resolve, reject) => {
    try {
      let res: MongoClient = await mongodb.connect(
        process.env.CONNECTIONSTRING!,
        {
          useUnifiedTopology: true,
        }
      );
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
export const setGlobalClient = (client: MongoClient) => {
  globalClient = client;
};
export const fetchCollection = (collection: string) => {
  return globalClient.db().collection(collection);
};
export default connectToDatabase;
