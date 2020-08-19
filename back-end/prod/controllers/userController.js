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
exports.setSelectedProfile = exports.validateSession = exports.profileFollowingScreen = exports.profileFollowersScreen = exports.profilePostsScreen = exports.ifUserExists = exports.home = exports.register = exports.logout = exports.login = exports.mustBeLoggedIn = exports.sharedProfileData = exports.doesEmailExist = exports.doesUsernameExist = void 0;
var User_1 = __importDefault(require("../models/User"));
var Post_1 = __importDefault(require("../models/Post"));
var Follow_1 = __importDefault(require("../models/Follow"));
exports.doesUsernameExist = function (req, res) {
    User_1.default.prototype
        .findByUserName(req.body.username)
        .then(function () {
        res.json(true);
    })
        .catch(function () {
        res.json(false);
    });
};
exports.doesEmailExist = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var emailBool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.prototype.doesEmailExist(req.body.email)];
                case 1:
                    emailBool = _a.sent();
                    res.json(emailBool);
                    return [2 /*return*/];
            }
        });
    });
};
exports.sharedProfileData = function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var isVisitorsProfile, isFollowing, postCountPromise, followerCountPromise, followingCountPromise, _b, postCount, followerCount, followingCount;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    isVisitorsProfile = false;
                    isFollowing = false;
                    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)) return [3 /*break*/, 2];
                    isVisitorsProfile = req.profileUser._id.equals(req.session.user._id);
                    return [4 /*yield*/, Follow_1.default.prototype.isVisitorFollowing(req.profileUser._id, req.visitorId)];
                case 1:
                    isFollowing = _c.sent();
                    _c.label = 2;
                case 2:
                    req.isVisitorsProfile = isVisitorsProfile;
                    req.isFollowing = isFollowing;
                    postCountPromise = Post_1.default.prototype.countPostsByAuthor(req.profileUser._id);
                    followerCountPromise = Follow_1.default.prototype.countFollowersById(req.profileUser._id);
                    followingCountPromise = Follow_1.default.prototype.countFollowingById(req.profileUser._id);
                    return [4 /*yield*/, Promise.all([
                            postCountPromise,
                            followerCountPromise,
                            followingCountPromise,
                        ])];
                case 3:
                    _b = _c.sent(), postCount = _b[0], followerCount = _b[1], followingCount = _b[2];
                    req.postCount = postCount;
                    req.followerCount = followerCount;
                    req.followingCount = followingCount;
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
exports.mustBeLoggedIn = function (req, res, next) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        next();
    }
    else {
        (_b = req.session) === null || _b === void 0 ? void 0 : _b.save(function () {
            res.status(401).json({ errors: ["log in first dumb ass"] });
        });
    }
};
exports.login = function (req, res) {
    console.log("logging user in...");
    var user = new User_1.default(req.body);
    user
        .login()
        .then(function () {
        var _a;
        var authenticatedUser = {
            avatar: user.avatar,
            username: user.data.username,
            _id: user.data._id,
        };
        req.session.user = authenticatedUser;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.send(authenticatedUser);
        });
    })
        .catch(function (e) {
        var _a;
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.status(500).send(e); // Internal Server Error
        });
    });
};
exports.logout = function (req, res) {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(function () {
        res.sendStatus(200);
    });
};
exports.register = function (req, res) {
    console.log("registering user...");
    var user = new User_1.default(req.body);
    user
        .register()
        .then(function () {
        var _a, _b;
        var registeredUser = {
            username: user.data.username,
            avatar: user.avatar,
            _id: user.data._id,
        };
        console.log("user registered", registeredUser);
        req.session.user = registeredUser;
        console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.user);
        (_b = req.session) === null || _b === void 0 ? void 0 : _b.save(function () {
            res.status(201).send(registeredUser);
        });
    })
        .catch(function (regErrors) {
        var _a;
        regErrors.forEach(function (error) {
            console.error(error);
        });
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.save(function () {
            res.sendStatus(500);
        });
    });
};
// Fetches HomeFeed
exports.home = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)) return [3 /*break*/, 2];
                console.log("fetching homefeed...");
                return [4 /*yield*/, Post_1.default.prototype.getFeed(req.session.user._id)];
            case 1:
                posts = _b.sent();
                console.log("these are the posts", posts);
                res.json(posts);
                return [3 /*break*/, 3];
            case 2:
                res.send({ errors: ["error fetching feed"] });
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Checks if a user exists in the database
exports.ifUserExists = function (req, res, next) {
    User_1.default.prototype
        .findByUserName(req.params.username)
        .then(function (userDocument) {
        req.profileUser = userDocument;
        next();
    })
        .catch(function () {
        res.sendStatus(404);
    });
};
// Fetches data for a users profile
exports.profilePostsScreen = function (req, res) {
    Post_1.default.prototype
        .findByAuthorId(req.profileUser._id)
        .then(function (posts) {
        res.send({
            title: "Profile for " + req.profileUser.username,
            currentPage: "posts",
            posts: posts,
            profileUsername: req.profileUser.username,
            profileAvatar: req.profileUser.avatar,
            isFollowing: req.isFollowing,
            isVisitorsProfile: req.isVisitorsProfile,
            counts: {
                postCount: req.postCount,
                followerCount: req.followerCount,
                followingCount: req.followingCount,
            },
        });
    })
        .catch(function (error) {
        res.sendStatus(404);
        console.log(error);
    });
};
// Fetches data for a users follower screen
exports.profileFollowersScreen = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var followers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Follow_1.default.prototype.getFollowersById(req.profileUser._id)];
                case 1:
                    followers = _a.sent();
                    res.send({
                        currentPage: "followers",
                        followers: followers,
                        profileUsername: req.profileUser.username,
                        profileAvatar: req.profileUser.avatar,
                        isFollowing: req.isFollowing,
                        isVisitorsProfile: req.isVisitorsProfile,
                        counts: {
                            postCount: req.postCount,
                            followerCount: req.followerCount,
                            followingCount: req.followingCount,
                        },
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.sendStatus(404);
                    console.log("error in profileFollowerScreen", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Fetches data for a user's following screen
exports.profileFollowingScreen = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var following, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Follow_1.default.prototype.getFollowingById(req.profileUser._id)];
                case 1:
                    following = _a.sent();
                    res.send({
                        currentPage: "following",
                        following: following,
                        profileUsername: req.profileUser.username,
                        profileAvatar: req.profileUser.avatar,
                        isFollowing: req.isFollowing,
                        isVisitorsProfile: req.isVisitorsProfile,
                        counts: {
                            postCount: req.postCount,
                            followerCount: req.followerCount,
                            followingCount: req.followingCount,
                        },
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.sendStatus(404);
                    console.log("error in profileFollowingScreen", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.validateSession = function (req, res) {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        res.send((_b = req.session) === null || _b === void 0 ? void 0 : _b.user);
    }
    else {
        res.send({});
    }
};
exports.setSelectedProfile = function (req, res) {
    req.selectedProfile = req.params.username;
    res.send(req.selectedProfile);
};
