import session from "express-session";
import db from "../db";

const MongoStore = require("connect-mongo")(session);
function sessionConfig(): session.SessionOptions {
  return {
    secret: process.env.SESSION_SECRET!,
    store: new MongoStore({ client: db.client }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  };
}
const sessionOptions = session(sessionConfig());
export default sessionOptions;
