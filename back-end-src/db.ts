// Prevents application from starting
// without a db connection
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import server from "./app";
dotenv.config();
async function startApp() {
  try {
    const db = await mongodb.connect(process.env.CONNECTIONSTRING!, {
      useUnifiedTopology: true,
    });
    server.listen(process.env.PORT, () =>
      console.log(`App is listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    if (err) throw new Error(err);
  }
}
startApp();
export default db;
