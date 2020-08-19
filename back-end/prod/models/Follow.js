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
var db_1 = require("../db");
var mongodb_1 = require("mongodb");
var User_1 = __importDefault(require("./User"));
var usersCollection = db_1.globalClient === null || db_1.globalClient === void 0 ? void 0 : db_1.globalClient.db().collection("users");
var followsCollection = db_1.globalClient === null || db_1.globalClient === void 0 ? void 0 : db_1.globalClient.db().collection("follows");
var Follow = /** @class */ (function () {
    function Follow(followedUsername, authorId) {
        this.followedUsername = followedUsername;
        this.authorId = authorId;
        this.errors = [];
    }
    return Follow;
}());
// class ends
Follow.prototype.cleanup = function () {
    if (typeof this.followedUsername != "string") {
        this.followedUsername = "";
    }
};
Follow.prototype.validate = function (action) {
    return __awaiter(this, void 0, void 0, function () {
        var followedAccount, doesFollowAlreadyExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (usersCollection === null || usersCollection === void 0 ? void 0 : usersCollection.findOne({
                        username: this.followedUsername,
                    }))];
                case 1:
                    followedAccount = _a.sent();
                    if (followedAccount) {
                        this.followedId = followedAccount._id;
                    }
                    else {
                        this.errors.push("you cannot follow a user that does not exist");
                    }
                    return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.findOne({
                            followedId: this.followedId,
                            authorId: new mongodb_1.ObjectID(this.authorId),
                        }))];
                case 2:
                    doesFollowAlreadyExist = _a.sent();
                    if (action == "create") {
                        if (doesFollowAlreadyExist) {
                            this.errors.push("you are already following this user");
                        }
                    }
                    if (action == "delete") {
                        if (!doesFollowAlreadyExist) {
                            this.errors.push("you cannot stop following someone you do not already follow");
                        }
                    }
                    //shoukld not be able to follow oneself
                    if (this.followedId.equals(this.authorId)) {
                        this.errors.push("you cannot follow yourself, idiot");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
Follow.prototype.create = function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.cleanup();
                                return [4 /*yield*/, this.validate("create")];
                            case 1:
                                _a.sent();
                                if (!!this.errors.length) return [3 /*break*/, 3];
                                return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.insertOne({
                                        followedId: this.followedId,
                                        authorId: new mongodb_1.ObjectID(this.authorId),
                                    }))];
                            case 2:
                                _a.sent();
                                resolve();
                                return [3 /*break*/, 4];
                            case 3:
                                reject(this.errors);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
Follow.prototype.deleteFollow = function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.cleanup();
                                return [4 /*yield*/, this.validate("delete")];
                            case 1:
                                _a.sent();
                                if (!!this.errors.length) return [3 /*break*/, 3];
                                return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.deleteOne({
                                        followedId: this.followedId,
                                        authorId: new mongodb_1.ObjectID(this.authorId),
                                    }))];
                            case 2:
                                _a.sent();
                                resolve();
                                return [3 /*break*/, 4];
                            case 3:
                                reject(this.errors);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
Follow.prototype.isVisitorFollowing = function (followedId, visitorId) {
    return __awaiter(this, void 0, void 0, function () {
        var followDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.findOne({
                        followedId: followedId,
                        authorId: new mongodb_1.ObjectID(visitorId),
                    }))];
                case 1:
                    followDoc = _a.sent();
                    if (followDoc) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
Follow.prototype.getFollowersById = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var followers, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.aggregate([
                            { $match: { followedId: id } },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "authorId",
                                    foreignField: "_id",
                                    as: "userDoc",
                                },
                            },
                            {
                                $project: {
                                    username: { $arrayElemAt: ["$userDoc.username", 0] },
                                    email: { $arrayElemAt: ["$userDoc.email", 0] },
                                },
                            },
                        ]).toArray())];
                case 1:
                    followers = _b.sent();
                    followers = followers === null || followers === void 0 ? void 0 : followers.map(function (follower) {
                        //fix this any
                        //create a user
                        var user = new User_1.default(follower, true);
                        return { username: follower.username, avatar: user.avatar };
                    });
                    resolve(followers);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    reject();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
Follow.prototype.getFollowingById = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var followers, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.aggregate([
                            { $match: { authorId: id } },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "followedId",
                                    foreignField: "_id",
                                    as: "userDoc",
                                },
                            },
                            {
                                $project: {
                                    username: { $arrayElemAt: ["$userDoc.username", 0] },
                                    email: { $arrayElemAt: ["$userDoc.email", 0] },
                                },
                            },
                        ]).toArray())];
                case 1:
                    followers = _b.sent();
                    followers = followers === null || followers === void 0 ? void 0 : followers.map(function (follower) {
                        // fix this any
                        //create a user
                        var user = new User_1.default(follower, true);
                        return { username: follower.username, avatar: user.avatar };
                    });
                    resolve(followers);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    reject();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
Follow.prototype.countFollowersById = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var followerCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.countDocuments({
                        followedId: id,
                    }))];
                case 1:
                    followerCount = _a.sent();
                    resolve(followerCount);
                    return [2 /*return*/];
            }
        });
    }); });
};
Follow.prototype.countFollowingById = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (followsCollection === null || followsCollection === void 0 ? void 0 : followsCollection.countDocuments({ authorId: id }))];
                case 1:
                    count = _a.sent();
                    resolve(count);
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = Follow;
