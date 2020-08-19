import express from "express";
const router = express.Router();
import {
  ifUserExists,
  sharedProfileData,
  profilePostsScreen,
  profileFollowersScreen,
  profileFollowingScreen,
} from "../controllers/userController";

// Profile related routes

router.get(
  "/profile/:username/posts",
  ifUserExists,
  sharedProfileData,
  profilePostsScreen
);
router.get(
  "/profile/:username/followers",
  ifUserExists,
  sharedProfileData,
  profileFollowersScreen
);
router.get(
  "/profile/:username/following",
  ifUserExists,
  sharedProfileData,
  profileFollowingScreen
);

export default router;
