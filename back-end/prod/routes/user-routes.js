"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
// User related routes
router.get("/", userController_1.validateSession);
router.get("/posts", userController_1.home);
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.post("/doesUsernameExist", userController_1.doesUsernameExist);
router.post("/doesEmailExist", userController_1.doesEmailExist);
router.post("/logout", userController_1.logout);
exports.default = router;
