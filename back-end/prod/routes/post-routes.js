"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
var postController_1 = require("../controllers/postController");
// Post related routes
router.post("/create-post", userController_1.mustBeLoggedIn, postController_1.create);
router.get("/post/:id", postController_1.viewSingle);
router.get("/post/:id/edit", userController_1.mustBeLoggedIn, postController_1.viewEditScreen);
router.post("/post/:id/edit", userController_1.mustBeLoggedIn, postController_1.edit);
router.post("/post/:id/delete", userController_1.mustBeLoggedIn, postController_1.deletePost);
router.post("/search", postController_1.search);
exports.default = router;
