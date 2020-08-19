import express from "express";
const router = express.Router();

import {
  validateSession,
  home,
  register,
  login,
  doesUsernameExist,
  doesEmailExist,
  logout,
} from "../controllers/userController";

// User related routes
router.get("/", validateSession);
router.get("/posts", home);
router.post("/register", register);
router.post("/login", login);
router.post("/doesUsernameExist", doesUsernameExist);
router.post("/doesEmailExist", doesEmailExist);
router.post("/logout", logout);

export default router;
