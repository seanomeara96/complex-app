"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var usersCollection = require("../db").db().collection("users");
var validator = require("validator");
var md5 = require("md5"); // Gravatar uses md5 hashing
var User = /** @class */ (function () {
    function User(data, getAvatar) {
        this.data = __assign({}, data);
        this.errors = [];
        if (getAvatar == undefined) {
            getAvatar = false;
        }
        if (getAvatar) {
            this.getAvatar();
        }
    }
    return User;
}());
User.prototype.cleanUp = function () {
    if (typeof this.data.username != "string") {
        this.data.username = "";
    }
    if (typeof this.data.email != "string") {
        this.data.email = "";
    }
    if (typeof this.data.password != "string") {
        this.data.password = "";
    }
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
    };
};
User.prototype.validate = function () {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var usernameExists, emailExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (this.data.username == "") {
                        this.errors.push("Provide a username...idiot");
                    }
                    if (this.data.username != "" &&
                        !validator.isAlphanumeric(this.data.username)) {
                        this.errors.push("usernames can only contain letters and numbers");
                    }
                    if (!validator.isEmail(this.data.email)) {
                        this.errors.push("A valid email address please, you moron");
                    }
                    if (this.data.password == "") {
                        this.errors.push("Make a password for yourself");
                    }
                    if (this.data.password.length > 0 && this.data.password.length < 12) {
                        this.errors.push("password must be at least 12 characters");
                    }
                    if (this.data.password.length > 50) {
                        this.errors.push("password cannot exceed 50 chracters");
                    }
                    if (this.data.username.length > 0 && this.data.username.length < 3) {
                        this.errors.push("username must be atleast 3 characters");
                    }
                    if (this.data.username.length > 30) {
                        this.errors.push("username cannot exceed 30 characters");
                    }
                    if (!(this.data.username.length > 2 &&
                        this.data.username.length < 31 &&
                        validator.isAlphanumeric(this.data.username))) return [3 /*break*/, 2];
                    return [4 /*yield*/, usersCollection.findOne({
                            username: this.data.username,
                        })];
                case 1:
                    usernameExists = _a.sent();
                    //usersCollection is our mongodb users collection
                    if (usernameExists) {
                        this.errors.push("this username is taken bitch");
                    }
                    _a.label = 2;
                case 2:
                    if (!validator.isEmail(this.data.email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, usersCollection.findOne({
                            email: this.data.email,
                        })];
                case 3:
                    emailExists = _a.sent();
                    //usersCollection is our mongodb users collection
                    if (emailExists) {
                        this.errors.push("this email is being is used you fuck");
                    }
                    _a.label = 4;
                case 4:
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
};
User.prototype.login = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.cleanUp();
        // findOne() takes two parameters
        // The first is an object that describes what we want to find
        // The second is a function that .findOne() is going to call once the first-
        // operation has had a chance to complete
        // because we dont know how long the search is going to take
        usersCollection
            .findOne({ username: _this.data.username }
        // .findOne() and all of mongodb's other functions will return a promise
        )
            .then(function (attemptedUser) {
            // fix this any
            // Hash the login password to check against hashed database password
            // Bcrypt.compareSync takes two parameters
            // 1st is the uhashed password
            if (attemptedUser &&
                bcrypt.compareSync(_this.data.password, attemptedUser.password)) {
                // attempteeduser's data becomes the data for this "user object"
                _this.data = attemptedUser;
                _this.getAvatar();
                resolve("congrats!!");
            }
            else {
                reject("invalid username/password");
            }
        })
            .catch(function () {
            reject("please try again later");
        });
    });
};
User.prototype.register = function () {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var salt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Step no.1 validate user data
                    this.cleanUp();
                    return [4 /*yield*/, this.validate()];
                case 1:
                    _a.sent();
                    if (!!this.errors.length) return [3 /*break*/, 3];
                    salt = bcrypt.genSaltSync(10);
                    // Overide the users password
                    this.data.password = bcrypt.hashSync(this.data.password, salt);
                    // Adds the new user to the database
                    return [4 /*yield*/, usersCollection.insertOne(this.data)];
                case 2:
                    // Adds the new user to the database
                    _a.sent();
                    this.getAvatar();
                    resolve();
                    return [3 /*break*/, 4];
                case 3:
                    reject(this.errors);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
User.prototype.getAvatar = function () {
    this.avatar = "https://gravatar.com/avatar/" + md5(this.data.email) + "?s=128";
};
User.prototype.findByUserName = function (username) {
    return new Promise(function (resolve, reject) {
        if (typeof username != "string") {
            // Dont allow people to pass objects onto mongodb
            reject();
        }
        // Object is what we want to find in our database
        usersCollection
            .findOne({ username: username })
            .then(function (userDoc) {
            // fix this any
            if (userDoc) {
                userDoc = new User(userDoc, true);
                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avatar: userDoc.avatar,
                };
                resolve(userDoc);
            }
            else {
                reject();
            }
        })
            .catch(function () {
            reject();
        });
    });
};
User.prototype.doesEmailExist = function (email) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof email != "string") {
                            resolve(false);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, usersCollection.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
};
exports.default = User;
