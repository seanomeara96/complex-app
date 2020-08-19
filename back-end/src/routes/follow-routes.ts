import express from "express";
const router = express.Router();
import { mustBeLoggedIn } from "../controllers/userController";
import { addFollow, removeFollow } from "../controllers/followController";

// Follow related routes

router.post("/addFollow/:username", mustBeLoggedIn, addFollow);
router.post("/removeFollow/:username", mustBeLoggedIn, removeFollow);

export default router;
