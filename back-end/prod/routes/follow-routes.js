"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
var followController_1 = require("../controllers/followController");
// Follow related routes
router.post("/addFollow/:username", userController_1.mustBeLoggedIn, followController_1.addFollow);
router.post("/removeFollow/:username", userController_1.mustBeLoggedIn, followController_1.removeFollow);
exports.default = router;
