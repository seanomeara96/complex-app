"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var MongoStore = require("connect-mongo")(express_session_1.default);
var sessionOptions = function (client) {
    return {
        secret: "Javacript is toit",
        store: new MongoStore({ client: client }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        },
    };
};
exports.default = sessionOptions;
