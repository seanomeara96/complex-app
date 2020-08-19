"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
// Prevents application from starting
// without a db connection
var dotenv_1 = __importDefault(require("dotenv"));
var mongodb_1 = __importDefault(require("mongodb"));
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
var client;
mongodb_1.default
    .connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
})
    .then(function (connection) {
    client = connection;
    app_1.default.listen(process.env.PORT, function () { return console.log("server is starting"); });
});
exports.connection = function () {
    return client;
};
