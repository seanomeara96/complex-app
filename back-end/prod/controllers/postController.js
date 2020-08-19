"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.deletePost = exports.edit = exports.viewEditScreen = exports.viewSingle = exports.create = void 0;
var Post_1 = __importDefault(require("../models/Post"));
var mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRIDAPIKEY);
var mongodb_1 = require("mongodb");
exports.create = function (req, res) {
    var _a;
    var post = new Post_1.default(req.body, (_a = req.session) === null || _a === void 0 ? void 0 : _a.user._id);
    post
        .create()
        .then(function () {
        var _a;
        mail_1.default.send({
            to: "redabihsot@gmail.com",
            from: "test@test.com",
            subject: "congrats on creating this post",
            text: "you did a great job of creating a post",
            html: "you did a <strong>Great</strong> job of creating a post",
        });
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.status(201).send(post);
        });
    })
        .catch(function (errors) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.status(500).send(errors);
        });
    });
};
exports.viewSingle = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Post_1.default.prototype.findSingleById(new mongodb_1.ObjectID(req.params.id), req.visitorId)];
                case 1:
                    post = _b.sent();
                    res.send({ post: post, title: post.data.title });
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    res.status(404).send({
                        errors: ["Post not found"],
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.viewEditScreen = function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var post, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Post_1.default.prototype.findSingleById(new mongodb_1.ObjectID(req.params.id), req.visitorId)];
                case 1:
                    post = _c.sent();
                    if (post.isVisitorOwner) {
                        res.status(200).send({ post: post });
                    }
                    else {
                        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
                            return res.status(401).send({
                                errors: ["you do not have permission to perform that action"],
                            });
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b = _c.sent();
                    res.status(404).send({
                        errors: ["Post not found."],
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.edit = function (req, res) {
    var post = new Post_1.default(req.body, req.visitorId, new mongodb_1.ObjectID(req.params.id));
    post
        .update()
        .then(function (status) {
        var _a, _b;
        if (status == "success") {
            // req.flash("success", "post successfully updated");
            (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
                res.status(201).send(req.params.id);
            });
        }
        else {
            (_b = req.session) === null || _b === void 0 ? void 0 : _b.save(function () {
                res.status(400).send({ errors: post.errors }); // Bad request
            });
        }
    })
        .catch(function () {
        var _a;
        // post with the requested id does not exist
        // or the current visitor is not the owner of the requested post
        // req.flash("errors", "you do not have permission to perform that action");
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            // not authorized
            res.status(401).send({
                errors: ["you do not have permission to perform that action"],
            });
        });
    });
};
exports.deletePost = function (req, res) {
    Post_1.default.prototype
        .deletePost(new mongodb_1.ObjectID(req.params.id), req.visitorId)
        .then(function () {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.sendStatus(200);
            // return to user profile
        });
    })
        .catch(function () {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res
                .status(401)
                .send({ errors: ["you do have permission to perform that action."] });
        });
    });
};
exports.search = function (req, res) {
    Post_1.default.prototype
        .search(req.body.searchTerm)
        .then(function (posts) {
        res.json(posts);
    })
        .catch(function () {
        res.json([]);
    });
};
