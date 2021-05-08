import { Server } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
//import server from "../config/socketConfig";
import request from "supertest";
//import db from "../db";
import { createPostURL, userRegistrationURL } from "../routes/URLs/urls";
let mongo: MongoMemoryServer;
let server: any;
let db: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const monogURI = await mongo.getUri();
  process.env.CONNECTIONSTRING = monogURI;
  const { default: dbImport } = await import("../db");
  db = dbImport;
  await db.connect();
  const { default: serverImport } = await import("../config/socketConfig");
  server = serverImport;
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

global.registerUser = async (username = "test", email = "test@test.com") => {
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

global.createTestPost = async (
  cookie,
  title = "this is the title",
  body = "this is the body",
  location = { lat: 53, long: -8 }
) => {
  const response = await request(server)
    .post(createPostURL())
    .send({
      title,
      body,
      location,
    })
    .set("Cookie", cookie);
  return response.body;
};

global.getServer = async () => {
  const { default: server } = await import("../config/socketConfig");
  return server;
};

declare global {
  namespace NodeJS {
    interface Global {
      /**
       * registers a test user
       * @param username unique username to register the new user with
       * @param email unique email string to register the new user with
       */
      registerUser(
        username?: string | undefined,
        email?: string | undefined
      ): Promise<string[]>;

      /**
       * Generates a username, email and passwrod from an email address because it will suffice for all
       * @param username valid user string
       * @param email valid email string
       */
      getTestUser(
        username: string,
        email: string
      ): { username: string; email: string; password: string };

      /**
       * returns post id
       * @param title defaults to "this is the title"
       * @param body defaults to "this is the body"
       * @param location defaults to { lat: 53, long: -8 }
       */
      createTestPost(
        cookie: string[],
        title?: string | undefined,
        body?: string | undefined,
        location?: { lat: number; long: number } | undefined
      ): any;

      getServer(): any;
    }
  }
}
