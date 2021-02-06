import express from "express";
import cors from "cors";
import corsConfig from "./corsConfig";
import filterHTML from "../utils/filterHTML";
import setVisitorId from "../utils/setVisitorId";
import router from "../router";
import sessionOptions from "./sessionOptionsConfig";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(sessionOptions); // typeof sessionOptions should be a requestHandler
app.use(filterHTML);
app.use(setVisitorId);
app.use("/", router);
export default app;
