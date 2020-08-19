"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var follow_routes_1 = __importDefault(require("./routes/follow-routes"));
var post_routes_1 = __importDefault(require("./routes/post-routes"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var profile_routes_1 = __importDefault(require("./routes/profile-routes"));
// export all
exports.default = [follow_routes_1.default, post_routes_1.default, user_routes_1.default, profile_routes_1.default];
