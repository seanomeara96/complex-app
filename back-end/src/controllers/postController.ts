import Post from "../models/Post";
import { ObjectID } from "mongodb";
import { Request, Response } from "express";
import sendGrid from "../config/sendgridConfig";
import * as EmailTemplate from "../utils/emailTemplates";
import { PostDocument } from "../models/modules/post-modules/_postBase";
export const create = function (req: Request, res: Response) {
  const postData = req.body;
  const userId = req.session?.user._id;
  let post = new Post(postData, userId);
  post
    .create()
    .then((postId) => {
      sendGrid.send(EmailTemplate.postCreated());
      req.session?.save(() => {
        res.status(201).send(postId);
      });
    })
    .catch((errors: string[]) => {
      req.session?.save(() => {
        res.status(500).send(errors);
      });
    });
};

export const viewSingle = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId;
  try {
    let post = await Post.prototype.findSingleById(postId, visitorId);
    res.send({ post: post, title: post.title });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      errors: ["Post not found"],
    });
  }
};

export const viewEditScreen = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
  try {
    let post = await Post.prototype.findSingleById(postId, visitorId);
    if (post.isVisitorOwner) {
      res.status(200).send({ post: post });
    } else {
      req.session?.save(() =>
        res.status(401).send({
          errors: ["you do not have permission to perform that action"],
        })
      );
    }
  } catch {
    res.status(404).send({
      errors: ["Post not found."],
    });
  }
};

export const edit = function (req: Request, res: Response) {
  let post = new Post(req.body, req.visitorId!, req.params.id);
  post
    .update()
    .then((status) => {
      if (status == "success") {
        // req.flash("success", "post successfully updated");
        req.session?.save(() => {
          res.status(201).send(req.params.id);
        });
      } else {
        req.session?.save(() => {
          res.status(400).send({ errors: post.errors }); // Bad request
        });
      }
    })
    .catch(() => {
      // post with the requested id does not exist
      // or the current visitor is not the owner of the requested post
      // req.flash("errors", "you do not have permission to perform that action");
      req.session?.save(() => {
        // not authorized
        res.status(401).send({
          errors: ["you do not have permission to perform that action"],
        });
      });
    });
};

export const deletePost = function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
  Post.prototype
    .deletePost(postId, visitorId)
    .then(() => {
      req.session?.save(() => {
        res.sendStatus(200);
        // return to user profile
      });
    })
    .catch(() => {
      req.session?.save(() => {
        res
          .status(401)
          .send({ errors: ["you do have permission to perform that action."] });
      });
    });
};

export const search = function (req: Request, res: Response) {
  console.log("search term", req.body);
  Post.prototype
    .search(req.body.searchTerm)
    .then((posts: PostDocument[]) => {
      res.json(posts);
    })
    .catch(() => {
      res.json([]);
    });
};
