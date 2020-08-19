"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var sessionOptions_1 = __importDefault(require("./sessionOptions"));
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var io = require("socket.io")(app_1.default);
// socket represents the connection between server and browser
io.use(function (socket, next) {
    sessionOptions_1.default(socket.request, socket.request.res, next);
});
io.on("connection", function (socket) {
    if (socket.request.session.user) {
        var user_1 = socket.request.session.user;
        socket.emit("welcome", { username: user_1.username, avatar: user_1.avatar });
        socket.on("chatMessageFromBrowser", function (data) {
            socket.broadcast.emit("chatMessageFromServer", {
                message: sanitize_html_1.default(data.message, {
                    allowedTags: [],
                    allowedAttributes: {},
                }),
                username: user_1.username,
                avatar: user_1.avatar,
            });
        });
    }
});
