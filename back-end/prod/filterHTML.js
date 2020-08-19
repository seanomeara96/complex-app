"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var marked_1 = __importDefault(require("marked"));
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var filterHTML = function (req, res, next) {
    // This needs refactoring as we no longer are using templates
    res.locals.filterUserHTML = function (content) {
        return sanitize_html_1.default(marked_1.default(content), {
            allowedTags: [
                "p",
                "br",
                "ul",
                "ol",
                "li",
                "strong",
                "bold",
                "i",
                "em",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
            ],
            allowedAttributes: {},
        });
    };
    next();
};
exports.default = filterHTML;
