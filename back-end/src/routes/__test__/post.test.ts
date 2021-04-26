import request from "supertest";
import server from "../../config/socketConfig";
import { createPostURL, viewSinglePostURL } from "../URLs/urls";

it("responds with 201 when post is successfully created", async () => {
  const cookie = await global.registerUser("test", "test@test.com");
  await request(server)
    .post(createPostURL())
    .send({
      title: "this is the titile",
      body: "this is the body",
      location: {
        lat: 53,
        long: -6,
      },
    })
    .set("Cookie", cookie)
    .expect(201);
});

it("responds with the correct post when it is fetched by id", async () => {
  const postTitle = "this is the titile";
  const postBody = "this is the body";
  const cookie = await global.registerUser("test", "test@test.com");
  const createPostResponse = await request(server)
    .post(createPostURL())
    .send({
      title: postTitle,
      body: postBody,
      location: {
        lat: 53,
        long: -6,
      },
    })
    .set("Cookie", cookie);
  let fetchPostResponse = await request(server).get(
    viewSinglePostURL(createPostResponse.body)
  );
  expect(fetchPostResponse.body.post.title).toEqual(postTitle);
  expect(fetchPostResponse.body.post.body).toEqual(postBody);
});

it("fetches edit screen?", async () => {
  // stuff goes here
});

it("responds with a 201 when a post has been sucessfully updated", async () => {
  // stuff goes here
});

it("responds with 200 when a post has been successfully deleted", async () => {
  // stuff goes here
});

it("responds with several posts when a common search term is supplied", async () => {
  // stuff goes here
});
