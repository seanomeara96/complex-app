// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import mongoConfig from "./config/mongoConfig";
dotenv.config();

class Connection {
  client: MongoClient | undefined;
  connectionString: string;
  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect() {
    try {
      this.client = await mongodb.connect(this.connectionString, mongoConfig);
    } catch (err) {
      console.error(err);
    }
  }

  fetchCollection(collection: string) {
    return this.client!.db().collection(collection);
  }
}

const db = new Connection(process.env.CONNECTIONSTRING!);

export default db;
