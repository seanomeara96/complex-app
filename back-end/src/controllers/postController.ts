import Post from "../models/Post";
import { Request, Response } from "express";
import sendGrid from "../config/sendgridConfig";
import * as EmailTemplate from "../utils/emailTemplates";
import { PostDocument } from "../models/modules/post-modules/postTypes";
export const create = async function (req: Request, res: Response) {
  const postData = req.body;
  const userId = req.session?.user._id;
  let post = new Post(postData, userId);
  try {
    const postId = await post.create();
    // sendGrid.send(EmailTemplate.postCreated());
    req.session?.save(() => {
      res.status(201).send(postId);
    });
  } catch (err) {
    req.session?.save(() => {
      res.sendStatus(500);
    });
  }
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
 * @param req
 * @param res
 */
export const viewEditScreen = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
  try {
    let post = await Post.prototype.findSingleById(postId, visitorId);
    if (post.isVisitorOwner) {
      res.send({ post });
    } else {
      req.session?.save(() => res.sendStatus(401));
    }
  } catch {
    req.session?.save(() => res.sendStatus(500));
  }
};

/**
 * updates the post
 * @param req
 * @param res
 */
export const edit = async function (req: Request, res: Response) {
  let post = new Post(req.body, req.visitorId!, req.params.id);
  try {
    const status = await post.update();
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
  } catch (err) {
    req.session?.save(() => {
      res.sendStatus(401);
    });
    console.log(err);
  }
};

/**
 * deletes the post
 * @param req requires the post id from url params
 * @param res requires visitorId so that authority can be confirmed
 */
export const deletePost = async function (req: Request, res: Response) {
  const postId = req.params.id;
  const visitorId = req.visitorId!;
  try {
    await Post.prototype.deletePost(postId, visitorId);
    req.session?.save(() => {
      res.sendStatus(200);
      // return to user profile
    });
  } catch (err) {
    req.session?.save(() => {
      res.sendStatus(401);
    });
    console.log(err);
  }
};

/**
 * Search posts by passing a seacrh term throught req.body
 * @param req body contains search term
 * @param res
 */
export const search = async function (req: Request, res: Response) {
  try {
    const posts = await Post.prototype.search(req.body.searchTerm);
    res.json(posts);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};
