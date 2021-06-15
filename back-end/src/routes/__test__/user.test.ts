import request from "supertest";
import {
  doesEmailExistURL,
  doesUsernameExistURL,
  userLoginURL,
  userLogoutURL,
  userRegistrationURL,
} from "../URLs/urls";
it("validates the user's current session", async () => {
  // stuff goes here
});

it("fetches the posts for the homepage", async () => {
  // create three users a, b, and c
  // create some posts as user b and c
  // login as user a and request homefeed
  // expect a post length > 1
  // stuff goes here
});

it("responds with 201 when it registers a new user", async () => {
  const server = await global.getServer();
  await request(server)
    .post(userRegistrationURL())
    .send({
      username: "sean",
      email: "sean@sean.com",
      password: "sean@sean.com",
    })
    .expect(201);
});

it("reponds with 200 when a user signs in", async () => {
  const server = await global.getServer();
  await global.registerUser("test", "test@test.com");
  await request(server)
    .post(userLoginURL())
    .send({ username: "test", password: "test@test.com" })
    .expect(200);
});

it("it responds true if username exists", async () => {
  const server = await global.getServer();
  const username = "test";
  const email = "test@test.com";
  await global.registerUser(username, email);
  await request(server)
    .post(doesUsernameExistURL())
    .send({ username })
    .expect("true");
});

it("responds with false if username doesnt exist", async () => {
  const server = await global.getServer();
  await request(server)
    .post(doesUsernameExistURL())
    .send({ username: "paddywagon" })
    .expect("false");
});

it("it responds true if email exists", async () => {
  const server = await global.getServer();
  const username = "test";
  const email = "test@test.com";
  await global.registerUser(username, email);
  await request(server)
    .post(doesEmailExistURL())
    .send({ email })
    .expect("true");
});

it("responds with false if email doesnt exist", async () => {
  const server = await global.getServer();
  await request(server)
    .post(doesEmailExistURL())
    .send({ email: "paddywagon@paddywagon.com" })
    .expect("false");
});

it("it responds with 200 when the user has logged out", async () => {
  const server = await global.getServer();
  await request(server).post(userLogoutURL()).send({}).expect(500);
});
