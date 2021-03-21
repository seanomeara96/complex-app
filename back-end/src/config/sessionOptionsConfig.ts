import session from "express-session";
import db from "../db";
import MongoStore from "connect-mongo";
function sessionConfig(): session.SessionOptions {
  return {
    secret: process.env.SESSION_SECRET!,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING! }),
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
