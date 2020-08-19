"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFollow = exports.addFollow = void 0;
var Follow_1 = __importDefault(require("../models/Follow"));
exports.addFollow = function (req, res) {
    var follow = new Follow_1.default(req.params.username, req.visitorId);
    //we want to create a follow document in the database that says x user is following y user
    follow
        .create()
        .then(function (result) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.json(result);
        });
    })
        .catch(function (errors) {
        var _a;
        console.log(errors, "followController addFollow");
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.json("there was a problem");
        });
    });
};
exports.removeFollow = function (req, res) {
    var follow = new Follow_1.default(req.params.username, req.visitorId);
    //we want to create a follow document in the database that says x user is following y user
    follow
        .deleteFollow()
        .then(function () {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.json("successfully stopped following " + req.params.username);
        });
    })
        .catch(function (errors) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            console.log(errors);
            res.json("oops try again later");
        });
    });
};
