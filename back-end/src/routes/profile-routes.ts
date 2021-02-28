import { Router } from "express";
import * as userController from "../controllers/userController";
import {
  userProfileFollowersURL,
  userProfileFollowingURL,
  userProfilePostsURL,
} from "./api-urls";
const router = Router();
// Profile related routes
router.get(
  userProfilePostsURL,
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profilePostsScreen
);
router.get(
  userProfileFollowersURL,
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profileFollowersScreen
);
router.get(
  userProfileFollowingURL,
  userController.ifUserExists,
  userController.sharedProfileData,
  userController.profileFollowingScreen
);

export default router;
