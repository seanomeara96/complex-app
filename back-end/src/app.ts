import server from "./config/socketConfig";
server.listen(process.env.PORT, () => console.log("app started successfully"));
// implement top level await to make this work
