import { Router } from "express";
import * as User from "../controllers/userController";
const router = Router();
// Profile related routes
router.get(
  "/profile/:username/posts",
  User.ifUserExists,
  User.sharedProfileData,
  User.profilePostsScreen
);
router.get(
  "/profile/:username/followers",
  User.ifUserExists,
  User.sharedProfileData,
  User.profileFollowersScreen
);
router.get(
  "/profile/:username/following",
  User.ifUserExists,
  User.sharedProfileData,
  User.profileFollowingScreen
);

export default router;
