import express, { RequestHandler } from "express";
import session from "express-session";
import filterHTML from "./utils/filterHTML";
import cors from "cors";
import router from "./router";
import setVisitorId from "./utils/setVisitorId";
import { Server } from "http";
import connectToDatabase, { setGlobalClient } from "./db";
import sanitizeHTML from "sanitize-html";
import { MongoClient } from "mongodb";
import corsConfig from "./config/corsConfig";
const MongoStore = require("connect-mongo")(session);
const app = express();
const server: Server = require("http").createServer(app);
const sessionConfig = (client: MongoClient) => {
  return {
    secret: "TypeScript is toit",
    store: new MongoStore({ client }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  };
};
let sessionOptions: RequestHandler;
async function main() {
  try {
    const client = await connectToDatabase();
    setGlobalClient(client);
    sessionOptions = session(sessionConfig(client));
    app.listen(process.env.PORT, () =>
      console.log(`Application listening on port ${process.env.port}`)
    );
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsConfig));
    app.use(sessionOptions);
    app.use(filterHTML);
    app.use(setVisitorId);
    app.use("/", router);
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
  } catch (err) {
    console.error(err);
  }
}
main();

export default server;
