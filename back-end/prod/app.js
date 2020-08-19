"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var marked_1 = __importDefault(require("marked"));
var cors_1 = __importDefault(require("cors"));
// import csrf from "csurf";
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var app = express_1.default();
var MongoStore = require("connect-mongo")(express_session_1.default);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default({
    credentials: true,
    origin: "http://localhost:3000",
}));
var db_1 = __importDefault(require("./db"));
var sessionOptions = express_session_1.default({
    secret: "Javacript is toit",
    store: new MongoStore({ client: db_1.default }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
});
app.use(sessionOptions);
app.use(function (req, res, next) {
    var _a;
    // This needs refactoring as we no longer are using templates
    res.locals.filterUserHTML = function (content) {
        return sanitize_html_1.default(marked_1.default(content), {
            allowedTags: [
                "p",
                "br",
                "ul",
                "ol",
                "li",
                "strong",
                "bold",
                "i",
                "em",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
            ],
            allowedAttributes: {},
        });
    };
    // Make current user id available on the req object
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        req.visitorId = req.session.user._id;
    }
    else {
        req.visitorId = undefined;
    }
    next();
});
var router_1 = __importDefault(require("./router"));
/* This is casuing issues for the time being
   csrf protection can be worked in later

app.use(csrf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      req.session.save(() => res.redirect("/"));
    } else {
      res.sendStatus("404");
    }
  }
}); */
app.use("/", router_1.default);
var server = require("http").createServer(app);
var io = require("socket.io")(server);
// socket represents the connection between server and browser
io.use(function (socket, next) {
    sessionOptions(socket.request, socket.request.res, next);
});
io.on("connection", function (socket) {
    // on() takes two arguments
    // 1st is the event type//  htis was defined in the sendMessageToserver function in chat.js
    // 2nd
    if (socket.request.session.user) {
        var user_1 = socket.request.session.user;
        socket.emit("welcome", { username: user_1.username, avatar: user_1.avatar });
        socket.on("chatMessageFromBrowser", function (data) {
            console.log(data.message); // message is a property we chose in our chat.js file
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
exports.default = server;
