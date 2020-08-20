import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../app";
import request from "supertest";

declare global {
  namespace NodeJS {
    interface Global {
      login(): Promise<string[]>;
    }
  }
}

global.login = async () => {
  const email = "test@test.com";
  const password = "password";
  const response = await request(server)
    .post("/login")
    .send({ email, password })
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};
