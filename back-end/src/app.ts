import db from "./db";
async function main() {
  await db.connect();
  const server = await import("./config/socketConfig");
  server.default.listen(process.env.PORT, () =>
    console.log("app started successfully")
  );
}
main();
