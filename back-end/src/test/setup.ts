import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../config/socketConfig";
import request from "supertest";
import db from "../db";
let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const monogURI = await mongo.getUri();
  process.env.CONNECTIONSTRING = monogURI;
  await db.connect();
});
