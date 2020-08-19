import express from "express";
const router = express.Router();
import { mustBeLoggedIn } from "../controllers/userController";
import {
  create,
  viewSingle,
  viewEditScreen,
  edit,
  deletePost,
  search,
} from "../controllers/postController";

// Post related routes

router.post("/create-post", mustBeLoggedIn, create);
router.get("/post/:id", viewSingle);
router.get("/post/:id/edit", mustBeLoggedIn, viewEditScreen);
router.post("/post/:id/edit", mustBeLoggedIn, edit);
router.post("/post/:id/delete", mustBeLoggedIn, deletePost);
router.post("/search", search);

export default router;
