"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController = __importStar(require("./controllers/userController"));
var postController = __importStar(require("./controllers/postController"));
var followController = __importStar(require("./controllers/followController"));
var router = express_1.default.Router();
// User related routes
router.get("/", userController.validateSession);
router.get("/posts", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/doesUsernameExist", userController.doesUsernameExist);
router.post("/doesEmailExist", userController.doesEmailExist);
router.post("/logout", userController.logout);
// Post related routes
router.post("/create-post", userController.mustBeLoggedIn, postController.create);
router.get("/post/:id", postController.viewSingle);
router.get("/post/:id/edit", userController.mustBeLoggedIn, postController.viewEditScreen);
router.post("/post/:id/edit", userController.mustBeLoggedIn, postController.edit);
router.post("/post/:id/delete", userController.mustBeLoggedIn, postController.deletePost);
router.post("/search", postController.search);
// Profile related routes
router.get("/profile/:username/posts", userController.ifUserExists, userController.sharedProfileData, userController.profilePostsScreen);
router.get("/profile/:username/followers", userController.ifUserExists, userController.sharedProfileData, userController.profileFollowersScreen);
router.get("/profile/:username/following", userController.ifUserExists, userController.sharedProfileData, userController.profileFollowingScreen);
// Follow related routes
router.post("/addFollow/:username", userController.mustBeLoggedIn, followController.addFollow);
router.post("/removeFollow/:username", userController.mustBeLoggedIn, followController.removeFollow);
exports.default = router;
