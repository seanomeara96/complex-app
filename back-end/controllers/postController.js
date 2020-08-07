const Post = require("../models/Post");
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRIDAPIKEY);

exports.viewCreateScreen = function (req, res) {
  res.render("create-post");
};

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then((newId) => {
      sendGrid.send({
        to: "redabihsot@gmail.com",
        from: "test@test.com",
        subject: "congrats on creating this post",
        text: "you did a great job of creating a post",
        html: "you did a <strong>Great</strong> job of creating a post",
      });
      req.flash("success", "New post successfully created.");
      req.session.save(() => {
        res.status(201).send(newId);
      });
    })
    .catch((errors) => {
      req.session.save(() => {
        res.status(500).send(errors);
      });
    });
};

exports.viewSingle = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.send({ post: post, title: post.title });
  } catch {
    res.status(404).send({
      errors: ["Post not found"],
    });
  }
};

exports.viewEditScreen = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    if (post.isVisitorOwner) {
      res.status(200).send({ post: post });
    } else {
      req.session.save(() =>
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

exports.edit = function (req, res) {
  let post = new Post(req.body, req.visitorId, req.params.id);
  post
    .update()
    .then((status) => {
      if (status == "success") {
        req.flash("success", "post successfully updated");
        req.session.save(() => {
          res.status(201).send(req.params.id);
        });
      } else {
        req.session.save(() => {
          res.status(400).send({ errors: post.errors }); // Bad request
        });
      }
    })
    .catch(() => {
      // post with the requested id does not exist
      // or the current visitor is not the owner of the requested post
      req.flash("errors", "you do not have permission to perform that action");
      req.session.save(() => {
        // not authorized
        res.status(401).send({
          errors: ["you do not have permission to perform that action"],
        });
      });
    });
};

exports.delete = function (req, res) {
  Post.delete(req.params.id, req.visitorId)
    .then(() => {
      req.session.save(() => {
        res.sendStatus(200);
        // return to user profile
      });
    })
    .catch(() => {
      req.session.save(() => {
        res
          .status(401)
          .send({ errors: ["you do have permission to perform that action."] });
      });
    });
};

exports.search = function (req, res) {
  Post.search(req.body.searchTerm)
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.json([]);
    });
};
