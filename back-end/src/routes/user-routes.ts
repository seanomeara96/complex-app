import { Router } from "express";
import * as userController from "../controllers/userController";
import {
  userHomefeedURL,
  userRegistrationURL,
  userLoginURL,
  doesUsernameExistURL,
  doesEmailExistURL,
  userLogoutURL,
} from "./URLs/urls";
const router = Router();
// User related routes
router.get("/", userController.validateSession); // this is definitely poor pracctice
router.get(userHomefeedURL(), userController.home);
router.post(userRegistrationURL(), userController.register);
router.post(userLoginURL(), userController.login);
router.post(doesUsernameExistURL(), userController.doesUsernameExist);
router.post(doesEmailExistURL(), userController.doesEmailExist);
router.post(userLogoutURL(), userController.logout);
export default router;
