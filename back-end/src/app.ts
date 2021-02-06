import connectToDatabase, { setGlobalClient } from "./db";
async function main() {
  const client = await connectToDatabase();
  setGlobalClient(client);
  const server = await import("./config/socketConfig");
  server.default.listen(process.env.PORT);
}
main();
// connect to database
// make client globally acessible
// configure sessionOptions (dependant on client being accessible)
// configure application modules that require access to session options
