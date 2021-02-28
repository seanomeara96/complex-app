import { Router } from "express";
import { mustBeLoggedIn } from "../controllers/userController";
import * as Post from "../controllers/postController";
import {
  createPostURL,
  viewSinglePostURL,
  editPostURL,
  deletePostURL,
  searchPostsURL,
} from "./api-urls";
const router = Router();
// Post related routes
router.post(createPostURL, mustBeLoggedIn, Post.create);
router.get(viewSinglePostURL, Post.viewSingle);
router.get(editPostURL, mustBeLoggedIn, Post.viewEditScreen);
router.post(editPostURL, mustBeLoggedIn, Post.edit);
router.post(deletePostURL, mustBeLoggedIn, Post.deletePost);
router.post(searchPostsURL, Post.search);
export default router;
