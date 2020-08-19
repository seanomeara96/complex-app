"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Prevents application from starting
// without a db connection
var dotenv_1 = __importDefault(require("dotenv"));
var mongodb_1 = __importDefault(require("mongodb"));
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
var db;
mongodb_1.default
    .connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
})
    .then(function (client) {
    db = client;
    app_1.default.listen(process.env.PORT, function () {
        return console.log("App is listening on port " + process.env.PORT);
    });
})
    .catch(function (err) {
    if (err)
        throw new Error(err);
    app_1.default.close();
});
exports.default = db;
