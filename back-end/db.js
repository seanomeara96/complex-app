// Prevents application from starting
// without a db connection
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");
console.log("starting...");
mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) throw new Error(err);
    module.exports = client;
    const app = require("./app");
    app.listen(process.env.PORT, () =>
      console.log(`App is listening on port ${process.env.PORT}`)
    );
  }
);
