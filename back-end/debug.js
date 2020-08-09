const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const router = require("./debug-router");
app.use("/", router);
app.listen(3002, () => console.log(`App is listening on port 3002`));
