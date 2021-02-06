import { RequestHandler } from "express";
import connectToDatabase, { setGlobalClient } from "./db";
import sessionConfig from "./config/sessionConfig";
import session from "express-session";
import appConfig from "./config/appConfig";
import socketConfig from "./config/socketConfig";
let sessionOptions: RequestHandler;
async function main() {
  try {
    const client = await connectToDatabase();
    setGlobalClient(client);
    sessionOptions = session(sessionConfig(client));
    appConfig(sessionOptions);
    socketConfig(sessionOptions);
  } catch (err) {
    console.error(err);
  }
}
main();
