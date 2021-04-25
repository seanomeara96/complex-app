import { Router } from "express";
import { mustBeLoggedIn } from "../controllers/userController";
import { addFollow, removeFollow } from "../controllers/followController";
import { addFollowURL, removeFollowURL } from "./URLs/urls";

const router = Router();
// Follow related routes
router.post(addFollowURL(), mustBeLoggedIn, addFollow);
router.post(removeFollowURL(), mustBeLoggedIn, removeFollow);
export default router;
