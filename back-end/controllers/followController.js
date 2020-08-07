const Follow = require("../models/Follow");
exports.addFollow = function (req, res) {
  let follow = new Follow(req.params.username, req.visitorId);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .create()
    .then(() => {
      req.flash("success", `successfully followed ${req.params.username}`);
      req.session.save(() => {
        res.redirect(`/profile/${req.params.username}`);
      });
    })
    .catch((errors) => {
      errors.forEach((error) => {
        req.flash("errors", error);
      });
      req.session.save(() => {
        res.redirect("/");
      });
    });
};
exports.removeFollow = function (req, res) {
  let follow = new Follow(req.params.username, req.visitorId);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .delete()
    .then(() => {
      req.flash(
        "success",
        `successfully stopped following ${req.params.username}`
      );
      req.session.save(() => {
        res.redirect(`/profile/${req.params.username}`);
      });
    })
    .catch((errors) => {
      errors.forEach((error) => {
        req.flash("errors", error);
      });
      req.session.save(() => {
        res.redirect("/");
      });
    });
};
