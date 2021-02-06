import { Request, Response, NextFunction } from "express";
const setVisitorId = (req: Request, res: Response, next: NextFunction) => {
  // Make current user id available on the req object
  if (req.session?.user) {
    req.visitorId = req.session!.user._id;
  } else {
    req.visitorId = undefined;
  }
  next();
};
export default setVisitorId;
