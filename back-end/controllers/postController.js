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
    .then(function (newId) {
      sendGrid.send({
        to: "redabihsot@gmail.com",
        from: "test@test.com",
        subject: "congrats on creating this post",
        text: "you did a great job of creating a post",
        html: "you did a <strong>Great</strong> job of creating a post",
      });
      req.flash("success", "New post successfully created.");
      req.session.save(() => {
        res.redirect(`/post/${newId}`);
      });
    })
    .catch(function (errors) {
      errors.forEach((error) => req.flash("errors", error));
      req.session.save(() => {
        res.redirect("/create-post");
      });
    });
};

exports.apiCreate = function (req, res) {
  let post = new Post(req.body, req.apiUser._id);
  post
    .create()
    .then(function (newId) {
      res.json("Congrats");
    })
    .catch(function (errors) {
      res.json(errors);
    });
};

exports.viewSingle = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post, title: post.title });
  } catch {
    res.render("404");
  }
};

exports.viewEditScreen = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    if (post.isVisitorOwner) {
      res.render("edit-post", { post: post });
    } else {
      console.log(post);
      req.flash("errors", "you do not have permission to perform that action");
      req.session.save(() => res.redirect("/"));
    }
  } catch {
    res.render("404");
  }
};

exports.edit = function (req, res) {
  let post = new Post(
    req.body,
    req.visitorId,
    req.params.id /*params are in the url*/
  );
  post
    .update()
    .then((status) => {
      // The post was successfully updated in the database
      // or user did have permission but there were validation errors
      if (status == "success") {
        // post was updated in db
        req.flash("success", "post successfully updated");
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      } else {
        post.errors.forEach(function (error) {
          req.flash("errors", error);
        });
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      }
    })
    .catch(() => {
      // post with the requested id does not exist
      //or the current visitor is not the owner of the requested post
      req.flash("errors", "you do not have permission to perform that action");
      req.session.save(function () {
        res.redirect("/");
      });
    });
};

exports.delete = function (req, res) {
  Post.delete(req.params.id, req.visitorId)
    .then(() => {
      req.flash("success", "post successfully deleted");
      req.session.save(() => {
        res.redirect(`/profile/${req.session.user.username}`);
      });
    })
    .catch(() => {
      req.flash("errors", "you do have permission to perform that action.");
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.apiDelete = function (req, res) {
  Post.delete(req.params.id, req.apiUser._id)
    .then(() => {
      res.json("success");
    })
    .catch(() => {
      res.json("you do not have permission to perform that action");
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
