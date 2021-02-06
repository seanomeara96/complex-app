import { Server } from "http";
import appConfig from "./appConfig";
import sanitizeHTML from "sanitize-html";
import { RequestHandler } from "express";
export default function (sessionOptions: RequestHandler) {
  const server: Server = require("http").createServer(appConfig);
  const io: SocketIO.Server = require("socket.io")(server);
  io.use(({ request }, next) => sessionOptions(request, request.res, next));
  io.on("connection", (socket) => {
    if (socket.request.session.user) {
      let user = socket.request.session.user;
      socket.emit("welcome", {
        username: user.username,
        avatar: user.avatar,
      });
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
}
