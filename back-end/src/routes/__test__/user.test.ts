import request from "supertest";
import server from "../../config/socketConfig";
import { doesUsernameExistURL } from "../api-urls";
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
  // stuff goes here
  // should also respond with a cookie or jwt that verfiies a session has been created
  // they should match the credentials of the user
  // they should not contain any sensitive information ie userId or password
});

it("reponds with 200 when a user signs in", async () => {
  // stuff goes here
  // again cookie/token should match sign in credentials
  // cookie token should not contain sensitive information
});

it("it responds true/false if username exists", async () => {
  // stuff goes here
  // register a user then attempt to register a user by the same name
});

it("it responds true/false if email exists", async () => {
  // stuff goes here
  await request(server)
    .post(doesUsernameExistURL)
    .send({ username: "username" })
    .expect(true);
});

it("it responds with 200 when the user has logged out", async () => {
  // stuff goes here
  // expires value in the past?
});
