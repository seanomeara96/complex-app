import db from "./db";
async function main() {
  await db.connect();
  const server = await import("./config/socketConfig");
  server.default.listen(process.env.PORT, () =>
    console.log("app started successfully")
  );
}
main();
// connect to database
// make client globally acessible
// configure sessionOptions (dependant on client being accessible)
// configure application modules that require access to session options
