"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
// Profile related routes
router.get("/profile/:username/posts", userController_1.ifUserExists, userController_1.sharedProfileData, userController_1.profilePostsScreen);
router.get("/profile/:username/followers", userController_1.ifUserExists, userController_1.sharedProfileData, userController_1.profileFollowersScreen);
router.get("/profile/:username/following", userController_1.ifUserExists, userController_1.sharedProfileData, userController_1.profileFollowingScreen);
exports.default = router;
