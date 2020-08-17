import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import markdown from "marked";
import cors from "cors";
// import csrf from "csurf";
import sanitizeHTML from "sanitize-html";
const app = express();
const MongoStore = require("connect-mongo")(session);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
let sessionOptions = session({
  secret: "Javacript is toit",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use((req: Request, res: Response, next: NextFunction) => {
  // This needs refactoring as we no longer are using templates
  res.locals.filterUserHTML = function (content: string) {
    return sanitizeHTML(markdown(content), {
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
  if (req.session!.user) {
    req.visitorId = req.session!.user._id;
  } else {
    req.visitorId = 0;
  }
  next();
});

import router from "./router";

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

app.use("/", router);
import { Server } from "http";
const server: Server = require("http").createServer(app);
const io: SocketIO.Server = require("socket.io")(server);
// socket represents the connection between server and browser
io.use(function (socket, next) {
  sessionOptions(socket.request, socket.request.res, next);
});
io.on("connection", function (socket) {
  // on() takes two arguments
  // 1st is the event type//  htis was defined in the sendMessageToserver function in chat.js
  // 2nd
  if (socket.request.session.user) {
    let user = socket.request.session.user;

    socket.emit("welcome", { username: user.username, avatar: user.avatar });

    socket.on("chatMessageFromBrowser", function (data) {
      console.log(data.message); // message is a property we chose in our chat.js file
      socket.broadcast.emit("chatMessageFromServer", {
        message: sanitizeHTML(data.message, {
          allowedTags: [],
          allowedAttributes: {},
        }),
        username: user.username,
        avatar: user.avatar,
      });
    });
  }
});

export default server;
