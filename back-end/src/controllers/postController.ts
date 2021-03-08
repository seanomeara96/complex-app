import Post from "../models/Post";
import { Request, Response } from "express";
import sendGrid from "../config/sendgridConfig";
import * as EmailTemplate from "../utils/emailTemplates";
import { PostDocument } from "../models/modules/post-modules/postTypes";
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

/**
 * requests a single post by passing the postId and visitorId to the post model's findSingle function
 * @param req express request object
 * @param res express response object
 */
export const viewSingle = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
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

/**
 * redundant? the client should determine whether they can see edit controls
 *
 * @param req
 * @param res
 */
export const viewEditScreen = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
  try {
    let post = await Post.prototype.findSingleById(postId, visitorId);
    if (post.isVisitorOwner) {
      res.status(200).send({ post });
    } else {
      req.session?.save(() => res.sendStatus(401));
    }
  } catch {
    req.session?.save(() => res.sendStatus(404));
  }
};

/**
 * updates the post
 *
 * @param req
 * @param res
 */
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

/**
 * deletes the post
 * @param req requires the post id from url params
 * @param res requires visitorId so that authority can be confirmed
 */
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
        res.sendStatus(401);
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
