const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const markdown = require("marked");
const csrf = require("csurf");
const app = express();
const sanitizeHTML = require("sanitize-html");
// To recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let sessionOptions = session({
  secret: "Javacript is toit",
  store: new MongoStore({ client: require("./db") }),
  // By default this session package will store session data in memory
  // but we can overide that default by using the store property
  // mongostore gets passed an object; directions to the database
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash()); // Still need this?
app.use(function (req, res, next) {
  // This needs refactoring as we no longer are using templates
  res.locals.filterUserHTML = function (content) {
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
      allowedAttributes: [],
    });
  };

  // Make all error and success flash messages available from all templates
  // Again can probably remove now
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");

  // Make current user id available on the req object
  if (req.session.user) {
    req.visitorId = req.session.user._id;
  } else {
    req.visitorId = 0;
  }
  next();
});
const router = require("./router");
app.use(csrf());
app.use(function (req, res, next) {
  // Reafctoring required
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(function (err, req, res, next) {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      req.flash("errors", "cross site request forgery detected");
      req.session.save(() => res.redirect("/"));
    } else {
      res.render("404");
    }
  }
});
app.use("/", router);
const server = require("http").createServer(app);
const io = require("socket.io")(server);
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
module.exports = server;
