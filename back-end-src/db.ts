// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import server from "./app";
dotenv.config();
let db: MongoClient | undefined;
mongodb
  .connect(process.env.CONNECTIONSTRING!, {
    useUnifiedTopology: true,
  })
  .then((client: MongoClient) => {
    db = client;
    server.listen(process.env.PORT, () =>
      console.log(`App is listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    if (err) throw new Error(err);
    server.close();
  });

export default db;
