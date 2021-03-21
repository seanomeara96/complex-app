// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import mongoConfig from "./config/mongoConfig";
dotenv.config();
class Connection {
  client: MongoClient | undefined;
  /**
   * database connection method
   * sets client object
   */
  async connect() {
    try {
      this.client = await mongodb.connect(
        process.env.CONNECTIONSTRING!,
        mongoConfig
      );
    } catch (err) {
      console.error(err);
    }
  }
  fetchCollection(collection: string) {
    return this.client!.db().collection(collection);
  }
  /**
   *
   * @returns all collections
   */
  fetchCollections() {
    return this.client!.db().collections();
  }
  closeConnection() {
    return new Promise((resolve, reject) => {
      this.client!.close().then(resolve).catch(reject);
    });
  }
}
const db = new Connection();
export default db;
