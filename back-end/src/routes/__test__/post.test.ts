import request from "supertest";
import server from "../../config/socketConfig";
import { createPostURL, editPostURL, viewSinglePostURL } from "../URLs/urls";

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
  const cookie = await global.registerUser();
  const postId = await global.createTestPost(cookie, postTitle, postBody);
  let fetchPostResponse = await request(server).get(viewSinglePostURL(postId));
  expect(fetchPostResponse.body.post.title).toEqual(postTitle);
  expect(fetchPostResponse.body.post.body).toEqual(postBody);
});

it("fetches edit screen?", async () => {
  // stuff goes here
});

it("responds with a 201 when a post has been sucessfully updated", async () => {
  /**
   * serious issues with this test
   * 
   * i cant just supply the field i want to update I have to supply a whole post object, but i risk overriding the initial lat long values
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * const cookie = await global.registerUser();
  const initialPostId = await global.createTestPost(cookie);
  const getPostResponse = await request(server).get(viewSinglePostURL(initialPostId));
  let post = getPostResponse.body
  const updatedTitle = "this is an updated title";
  const updatedPost = await request(server)
    .post(editPostURL(initialPost))
    .send(post)
    .set("Cookie", cookie)
    .expect(201);
   */
});

it("responds with 200 when a post has been successfully deleted", async () => {
  // stuff goes here
});

it("responds with several posts when a common search term is supplied", async () => {
  // stuff goes here
});
