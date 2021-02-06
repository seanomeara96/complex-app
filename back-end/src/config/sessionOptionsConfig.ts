import session from "express-session";
import { globalClient } from "../db";
const MongoStore = require("connect-mongo")(session);
function sessionConfig() {
  return {
    secret: "TypeScript is toit",
    store: new MongoStore({ client: globalClient }),
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
