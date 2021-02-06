import { Router } from "express";
import * as User from "../controllers/userController";
const router = Router();
// User related routes
router.get("/", User.validateSession);
router.get("/posts", User.home);
router.post("/register", User.register);
router.post("/login", User.login);
router.post("/doesUsernameExist", User.doesUsernameExist);
router.post("/doesEmailExist", User.doesEmailExist);
router.post("/logout", User.logout);
export default router;
