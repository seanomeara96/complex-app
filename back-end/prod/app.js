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
var express_session_1 = __importDefault(require("express-session"));
var filterHTML_1 = __importDefault(require("./filterHTML"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var setVisitorId_1 = __importDefault(require("./setVisitorId"));
var db_1 = __importStar(require("./db"));
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var MongoStore = require("connect-mongo")(express_session_1.default);
var app = express_1.default();
var server = require("http").createServer(app);
var corsConfig = {
    credentials: true,
    origin: "http://localhost:3000",
};
var sessionOptions;
db_1.default()
    .then(function (client) {
    db_1.setGlobalClient(client);
    sessionOptions = express_session_1.default({
        secret: "Javacript is toit",
        store: new MongoStore({ client: client }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        },
    });
    app.listen(process.env.PORT, function () {
        return console.log("Application listening on port " + process.env.port);
    });
})
    .then(function () {
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use(cors_1.default(corsConfig));
    app.use(sessionOptions);
    app.use(filterHTML_1.default);
    app.use(setVisitorId_1.default);
    app.use("/", router_1.default);
    var io = require("socket.io")(server);
    // socket represents the connection between server and browser
    io.use(function (socket, next) {
        sessionOptions(socket.request, socket.request.res, next);
    });
    io.on("connection", function (socket) {
        if (socket.request.session.user) {
            var user_1 = socket.request.session.user;
            socket.emit("welcome", {
                username: user_1.username,
                avatar: user_1.avatar,
            });
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
})
    .catch(function () {
    console.log("something went wrong...");
});
exports.default = server;
