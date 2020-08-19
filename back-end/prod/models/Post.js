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
var db_1 = __importDefault(require("../db"));
var mongodb_1 = require("mongodb");
var User_1 = __importDefault(require("./User"));
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var postsCollection = db_1.default.db().collection("posts");
var followsCollection = db_1.default.db().collection("follows");
var Post = /** @class */ (function () {
    function Post(data, userid, requestedPostId) {
        this.data = data;
        this.errors = [];
        this.userid = userid;
        this.requestedPostId = requestedPostId;
    }
    return Post;
}());
Post.prototype.create = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.cleanUp();
        _this.validate();
        if (!_this.errors.length) {
            // Save post to database
            postsCollection
                .insertOne(_this.data)
                .then(function (info) {
                // fix this
                resolve(info.ops[0]._id);
            })
                .catch(function () {
                _this.errors.push("please try again later");
                reject(_this.errors);
            });
        }
        else {
            //reject
            reject(_this.errors);
        }
    });
};
Post.prototype.update = function () {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var post, status_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, Post.prototype.findSingleById(this.requestedPostId, this.userid)];
                case 1:
                    post = _b.sent();
                    if (!post.isVisitorOwner) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.actuallyUpdate()];
                case 2:
                    status_1 = _b.sent();
                    resolve(status_1);
                    return [3 /*break*/, 4];
                case 3:
                    reject();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    reject();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
Post.prototype.actuallyUpdate = function () {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.cleanUp();
                    this.validate();
                    if (!!this.errors.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, postsCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectID(this.requestedPostId) }, { $set: { title: this.data.title, body: this.data.body } })];
                case 1:
                    _a.sent();
                    resolve("success");
                    return [3 /*break*/, 3];
                case 2:
                    resolve("failure");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
Post.prototype.cleanUp = function () {
    if (typeof this.data.title != "string") {
        this.data.title = "";
    }
    if (typeof this.data.body != "string") {
        this.data.body = "";
    }
    // Get rid of any bogus properties
    this.data = {
        title: sanitize_html_1.default(this.data.title.trim(), {
            allowedTags: [],
            allowedAttributes: {},
        }),
        body: sanitize_html_1.default(this.data.body.trim(), {
            allowedTags: [],
            allowedAttributes: {},
        }),
        // First argument is what you are trying to sanitize
        // Second is an object with configuration options
        createdDate: new Date(),
        // We use this ObjectID function because mongo
        // prefers that we store IDs as objects ratgher than strings of text
        author: new mongodb_1.ObjectID(this.userid),
    };
};
Post.prototype.validate = function () {
    if (this.data.title == "") {
        this.errors.push("you must provide a title");
    }
    if (this.data.body == "") {
        this.errors.push("you must provide post content");
    }
};
Post.prototype.reusablePostQuery = function (uniqueOperations, visitorId) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function () {
            var aggOperations, posts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aggOperations = uniqueOperations.concat([
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "author",
                                    foreignField: "_id",
                                    as: "authorDocument",
                                },
                            },
                            {
                                $project: {
                                    title: 1,
                                    body: 1,
                                    createdDate: 1,
                                    authorId: "$author",
                                    author: { $arrayElemAt: ["$authorDocument", 0] },
                                },
                            },
                        ]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, postsCollection.aggregate(aggOperations).toArray()];
                    case 2:
                        posts = _a.sent();
                        posts = posts.map(function (post) {
                            post.isVisitorOwner = post.authorId.equals(visitorId);
                            post.authorId = undefined;
                            post.author = {
                                username: post.author.username,
                                avatar: new User_1.default(post.author, true).avatar,
                            };
                            return post;
                        });
                        resolve(posts);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Error from reusablepost query", err_1);
                        reject(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
};
Post.prototype.findSingleById = function (id, visitorId) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof id != "string" || !mongodb_1.ObjectID.isValid(id)) {
                            //OjectID converts the string into mongodb format
                            reject();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Post.prototype.reusablePostQuery([{ $match: { _id: new mongodb_1.ObjectID(id) } }], new mongodb_1.ObjectID(visitorId))];
                    case 1:
                        posts = _a.sent();
                        if (posts.length) {
                            console.log(posts[0]);
                            // If this mongodb finds a post (array has more than 0 items) this will return true
                            resolve(posts[0]);
                        }
                        else {
                            reject();
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
};
Post.prototype.findByAuthorId = function (authorId) {
    return Post.prototype.reusablePostQuery([
        { $match: { author: authorId } },
        { $sort: { createdDate: -1 } },
    ]);
};
Post.prototype.deletePost = function (postIdToDelete, currentUserId) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var post, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, Post.prototype.findSingleById(postIdToDelete, currentUserId)];
                case 1:
                    post = _b.sent();
                    if (!post.isVisitorOwner) return [3 /*break*/, 3];
                    return [4 /*yield*/, postsCollection.deleteOne({ _id: new mongodb_1.ObjectID(postIdToDelete) })];
                case 2:
                    _b.sent();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    reject();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    reject();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
Post.prototype.search = function (searchTerm) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var posts, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof searchTerm == "string")) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("...searching");
                    return [4 /*yield*/, Post.prototype.reusablePostQuery([
                            { $match: { $text: { $search: searchTerm } } },
                            { $sort: { score: { $meta: "textScore" } } },
                        ])];
                case 2:
                    posts = _a.sent();
                    console.log(posts);
                    resolve(posts);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log("error with search", err_2);
                    reject();
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    reject();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
Post.prototype.countPostsByAuthor = function (id) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var postCount, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, postsCollection.countDocuments({ author: id })];
                case 1:
                    postCount = _a.sent();
                    resolve(postCount);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    reject(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
Post.prototype.getFeed = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var followedUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, followsCollection
                        .find({ authorId: new mongodb_1.ObjectID(id) })
                        .toArray()];
                case 1:
                    followedUsers = _a.sent();
                    followedUsers = followedUsers.map(function (followDoc) {
                        return followDoc.followedId;
                    });
                    // Look for posts where author is in the above array of followed users
                    return [2 /*return*/, Post.prototype.reusablePostQuery([
                            { $match: { author: { $in: followedUsers } } },
                            { $sort: { createdDate: -1 } },
                        ])];
            }
        });
    });
};
exports.default = Post;
