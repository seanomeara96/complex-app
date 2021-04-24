// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import mongoConfig from "./config/mongoConfig";
dotenv.config();
class Connection {
  client: MongoClient | undefined;
  collectionNames: string[];
  collections: any;
  constructor() {
    this.collectionNames = ["users", "posts", "follows"];
    this.collections = {};
  }
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
      this.setCollections();
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Sets Collections
   */
  setCollections() {
    for (let name in this.collectionNames) {
      this.collections[this.collectionNames[name]] = this.fetchCollection(
        this.collectionNames[name]
      );
    }
  }
  /**
   * Fetches collection by name
   * @param collection
   * @returns
   */
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
  /**
   *
   * @returns closes connection with the database
   */
  closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client!.close()
        .then(() => {
          console.log("connection closed");
          resolve();
        })
        .catch(reject);
    });
  }
}
const db = new Connection();
export default db;
