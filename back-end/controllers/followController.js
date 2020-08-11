const Follow = require("../models/Follow");
exports.addFollow = function (req, res) {
  let follow = new Follow(req.params.username, req.visitorId);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .create()
    .then((result) => {
      req.session.save(() => {
        res.json(result);
      });
    })
    .catch((errors) => {
      console.log(errors, "followController addFollow");
      req.session.save(() => {
        res.json("there was a problem");
      });
    });
};
exports.removeFollow = function (req, res) {
  let follow = new Follow(req.params.username, req.visitorId);
  //we want to create a follow document in the database that says x user is following y user
  follow
    .delete()
    .then(() => {
      req.session.save(() => {
        res.json(`successfully stopped following ${req.params.username}`);
      });
    })
    .catch((errors) => {
      req.session.save(() => {
        console.log(errors);
        res.json("oops try again later");
      });
    });
};
