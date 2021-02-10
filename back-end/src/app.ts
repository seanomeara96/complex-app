import server from "./config/socketConfig";
import client from "./db";
const start = async () => {
  await client();
  server.listen(process.env.PORT, () =>
    console.log("app started successfully")
  );
};
start();
// implement top level await to make this work
