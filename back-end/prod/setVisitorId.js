"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setVisitorId = function (req, res, next) {
    var _a;
    // Make current user id available on the req object
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        req.visitorId = req.session.user._id;
    }
    else {
        req.visitorId = undefined;
    }
    next();
};
exports.default = setVisitorId;
