import { MongoClient, SessionOptions } from "mongodb";
import session from "express-session";
const MongoStore = require("connect-mongo")(session);
let sessionOptions = (client: MongoClient) => {
  return {
    secret: "Javacript is toit",
    store: new MongoStore({ client }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  };
};
export default sessionOptions;
