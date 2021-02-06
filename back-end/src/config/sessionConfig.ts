import session from "express-session";
import { MongoClient } from "mongodb";
const MongoStore = require("connect-mongo")(session);
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

export default sessionConfig;
