import { Router } from "express";
import { mustBeLoggedIn } from "../controllers/userController";
import * as Post from "../controllers/postController";
const router = Router();
// Post related routes
router.post("/create-post", mustBeLoggedIn, Post.create);
router.get("/post/:id", Post.viewSingle);
router.get("/post/:id/edit", mustBeLoggedIn, Post.viewEditScreen);
router.post("/post/:id/edit", mustBeLoggedIn, Post.edit);
router.post("/post/:id/delete", mustBeLoggedIn, Post.deletePost);
router.post("/search", Post.search);
export default router;
