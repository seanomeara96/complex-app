import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import session from "express-session";
import filterHTML from "./filterHTML";
import cors from "cors";
import router from "./router";
import setVisitorId from "./setVisitorId";
import { Server } from "http";
import connectToDatabase, { setGlobalClient, globalClient } from "./db";
import sanitizeHTML from "sanitize-html";
const MongoStore = require("connect-mongo")(session);
const app = express();
const server: Server = require("http").createServer(app);
const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};
let sessionOptions: RequestHandler;
connectToDatabase()
  .then((client) => {
    setGlobalClient(client);
    app.listen(process.env.PORT, () =>
      console.log(`Application listening on port ${process.env.port}`)
    );
    sessionOptions = session({
      secret: "Javacript is toit",
      store: new MongoStore({ client }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      },
    });
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsConfig));
    app.use(sessionOptions);
    app.use(filterHTML);
    app.use(setVisitorId);
    app.use("/", router);
    const io: SocketIO.Server = require("socket.io")(server);
    // socket represents the connection between server and browser
    io.use(function (socket, next) {
      sessionOptions(socket.request, socket.request.res, next);
    });
    io.on("connection", function (socket) {
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
  })
  .catch(() => {
    console.log("something went wrong...");
  });

export default server;
