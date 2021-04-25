import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../config/socketConfig";
import request from "supertest";
import db from "../db";
import { userRegistrationURL } from "../routes/URLs/urls";
let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const monogURI = await mongo.getUri();
  process.env.CONNECTIONSTRING = monogURI;
  await db.connect();
});

beforeEach(async () => {
  const collections = await db.fetchCollections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await db.closeConnection();
});

global.registerUser = async (username, email) => {
  const response = await request(server)
    .post(userRegistrationURL())
    .send(global.getTestUser(username, email))
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};

global.getTestUser = (username, email) => {
  return {
    username,
    email,
    password: email,
  };
};

declare global {
  namespace NodeJS {
    interface Global {
      /**
       * registers a test user
       * @param username unique username to register the new user with
       * @param email unique email string to register the new user with
       */
      registerUser(username: string, email: string): Promise<string[]>;
      /**
       * Generates a username, email and passwrod from an email address because it will suffice for all
       * @param username valid user string
       * @param email valid email string
       */
      getTestUser(
        username: string,
        email: string
      ): { username: string; email: string; password: string };
    }
  }
}
