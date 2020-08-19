import server from "./app";
import sessionOptions from "./sessionOptions";
import sanitizeHTML from "sanitize-html";
const io: SocketIO.Server = require("socket.io")(server);
// socket represents the connection between server and browser
io.use(function (socket, next) {
  sessionOptions(socket.request, socket.request.res, next);
});
io.on("connection", function (socket) {
  if (socket.request.session.user) {
    let user = socket.request.session.user;
    socket.emit("welcome", { username: user.username, avatar: user.avatar });
    socket.on("chatMessageFromBrowser", function (data) {
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
