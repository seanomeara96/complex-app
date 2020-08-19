import Follow from "../models/Follow";
import { Request, Response } from "express";
export const addFollow = function (req: Request, res: Response) {
  let follow = new Follow(req.params.username, req.visitorId!);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .create()
    .then((result) => {
      req.session?.save(() => {
        res.json(result);
      });
    })
    .catch((errors) => {
      console.log(errors, "followController addFollow");
      req.session?.save(() => {
        res.json("there was a problem");
      });
    });
};
export const removeFollow = function (req: Request, res: Response) {
  let follow = new Follow(req.params.username, req.visitorId!);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .deleteFollow()
    .then(() => {
      req.session?.save(() => {
        res.json(`successfully stopped following ${req.params.username}`);
      });
    })
    .catch((errors: string[]) => {
      req.session?.save(() => {
        console.log(errors);
        res.json("oops try again later");
      });
    });
};
