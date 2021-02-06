import { Router } from "express";
import { mustBeLoggedIn } from "../controllers/userController";
import { addFollow, removeFollow } from "../controllers/followController";
const router = Router();
// Follow related routes
router.post("/addFollow/:username", mustBeLoggedIn, addFollow);
router.post("/removeFollow/:username", mustBeLoggedIn, removeFollow);
export default router;
