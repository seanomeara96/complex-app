import Post from "../models/Post";
import { ObjectID } from "mongodb";
import { Request, Response } from "express";
import sendGrid from "../config/sendgridConfig";
import * as EmailTemplate from "../utils/emailTemplates";
export const create = function (req: Request, res: Response) {
  const postData = req.body;
  const userId = req.session?.user._id;
  let post = new Post(postData, userId);
  post
    .create()
    .then(() => {
      sendGrid.send(EmailTemplate.postCreated());
      req.session?.save(() => {
        res.status(201).send(post);
      });
    })
    .catch((errors: string[]) => {
      req.session?.save(() => {
        res.status(500).send(errors);
      });
    });
};

export const viewSingle = async function (req: Request, res: Response) {
  const postId = new ObjectID(req.params.id);
  const visitorId = new ObjectID(req.visitorId);
  try {
    let post = await Post.prototype.findSingleById(postId, visitorId);
    console.log("this is the post i received", post);
    res.send({ post: post, title: post.title }); // need to differentiate between Post Class and Post Document
  } catch (err) {
    console.log(err);
    res.status(404).send({
      errors: ["Post not found"],
    });
  }
};

export const viewEditScreen = async function (req: Request, res: Response) {
  const postId = new ObjectID(req.params.id);
  const visitorId = new ObjectID(req.visitorId!);
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
  let post = new Post(req.body, req.visitorId!, new ObjectID(req.params.id));
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
  Post.prototype
    .deletePost(new ObjectID(req.params.id), req.visitorId!)
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
    .then((posts: Post[]) => {
      res.json(posts);
    })
    .catch(() => {
      res.json([]);
    });
};
