import express, { RequestHandler } from "express";
import cors from "cors";
import corsConfig from "./corsConfig";
import filterHTML from "../utils/filterHTML";
import setVisitorId from "../utils/setVisitorId";
import router from "../router";
export default function (sessionOptions: RequestHandler) {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsConfig));
  app.use(sessionOptions);
  app.use(filterHTML);
  app.use(setVisitorId);
  app.use("/", router);
  app.listen(process.env.PORT, () =>
    console.log(`Application listening on port ${process.env.port}`)
  );
}
