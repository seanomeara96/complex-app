import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import filterHTML from "./filterHTML";
import cors from "cors";
import router from "./router";
import setVisitorId from "./setVisitorId";
import { Server } from "http";
import connectToDatabase from "./db";
import sessionOptions from "./sessionOptions";
import { MongoClient } from "mongodb";
const app = express();
const server: Server = require("http").createServer(app);
const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};
connectToDatabase()
  .then((client) => {
    app.listen(process.env.PORT, () => console.log("starting server"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsConfig));
    app.use(session(sessionOptions(client)));
    app.use(filterHTML);
    app.use(setVisitorId);
    //app.use("/", router);
  })
  .catch(() => {
    console.log("something went wrong...");
  });
export default server;
