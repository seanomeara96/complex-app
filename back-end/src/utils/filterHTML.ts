import { Request, Response, NextFunction } from "express";
import markdown from "marked";
import sanitizeHTML from "sanitize-html";
const filterHTML = (req: Request, res: Response, next: NextFunction) => {
  // This needs refactoring as we no longer are using templates
  res.locals.filterUserHTML = function (content: string) {
    return sanitizeHTML(markdown(content), {
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

export default filterHTML;
