import Post from "../models/Post";
import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(process.env.SENDGRIDAPIKEY!);
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
export const create = function (req: Request, res: Response) {
  console.log(req.body, "received this from client: req.body");
  let post = new Post(req.body, req.session?.user._id);
  post
    .create()
    .then(() => {
      alertUser();
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
  try {
    let post = await Post.prototype.findSingleById(
      new ObjectID(req.params.id),
      new ObjectID(req.visitorId)
    );
    res.send({ post: post, title: post.data.title });
  } catch {
    res.status(404).send({
      errors: ["Post not found"],
    });
  }
};

export const viewEditScreen = async function (req: Request, res: Response) {
  try {
    let post = await Post.prototype.findSingleById(
      new ObjectID(req.params.id),
      req.visitorId!
    );
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

function alertUser() {
  sendGrid.send({
    to: "redabihsot@gmail.com",
    from: "seanom96@gmail.com",
    subject: "congrats on creating this post",
    text: "you did a great job of creating a post",
    html: "you did a <strong>Great</strong> job of creating a post",
  });
}
