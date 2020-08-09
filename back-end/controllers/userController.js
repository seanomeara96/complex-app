const User = require("../models/User");
const Post = require("../models/Post");
const Follow = require("../models/Follow");
const jwt = require("jsonwebtoken");
const { send } = require("@sendgrid/mail");

exports.doesUsernameExist = function (req, res) {
  User.findByUserName(req.body.username)
    .then(() => {
      res.json(true);
    })
    .catch(() => {
      res.json(false);
    });
};
exports.doesEmailExist = async function (req, res) {
  let emailBool = await User.doesEmailExist(req.body.email);
  res.json(emailBool);
};
exports.sharedProfileData = async function (req, res, next) {
  let isVisitorsProfile = false;
  let isFollowing = false;
  if (req.session.user) {
    isVisitorsProfile = req.profileUser._id.equals(req.session.user._id);
    isFollowing = await Follow.isVisitorFollowing(
      req.profileUser._id,
      req.visitorId
    );
  }
  req.isVisitorsProfile = isVisitorsProfile;
  req.isFollowing = isFollowing;
  // Retreive post, follower, and following counts
  let postCountPromise = Post.countPostsByAuthor(req.profileUser._id);
  let followerCountPromise = Follow.countFollowersById(req.profileUser._id);
  let followingCountPromise = Follow.countFollowingById(req.profileUser._id);
  let [postCount, followerCount, followingCount] = await Promise.all([
    postCountPromise,
    followerCountPromise,
    followingCountPromise,
  ]);
  req.postCount = postCount;
  req.followerCount = followerCount;
  req.followingCount = followingCount;
  next();
};

exports.mustBeLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.save(() => {
      res.status(401).json({ errors: ["log in first dumb ass"] });
    });
  }
};

exports.login = (req, res) => {
  console.log("logging user in...");
  let user = new User(req.body);
  user
    .login()
    .then(() => {
      let authenticatedUser = {
        avatar: user.avatar,
        username: user.data.username,
        _id: user.data._id,
      };
      req.session.user = authenticatedUser;
      req.session.save(() => {
        res.send(authenticatedUser);
      });
    })
    .catch((e) => {
      req.session.save(() => {
        res.status(500).send(e); // Internal Server Error
      });
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
};

exports.register = (req, res) => {
  console.log("registering user...");
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      let registeredUser = {
        username: user.data.username,
        avatar: user.avatar,
        _id: user.data._id,
      };
      console.log("user registered", registeredUser);
      req.session.user = registeredUser;
      console.log(req.session.user);
      req.session.save(() => {
        res.status(201).send(registeredUser);
      });
    })
    .catch((regErrors) => {
      regErrors.forEach((error) => {
        console.error(error);
      });
      req.session.save(() => {
        res.sendStatus(500);
      });
    });
};

// Fetches HomeFeed
exports.home = async (req, res) => {
  if (req.session.user) {
    console.log("fetching homefeed...");
    let posts = await Post.getFeed(req.session.user._id);
    console.log("these are the posts", posts);
    res.json(posts);
  } else {
    res.send({ errors: ["error fetching feed"] });
  }
};

// Checks if a user exists in the database
exports.ifUserExists = function (req, res, next) {
  User.findByUserName(req.params.username)
    .then((userDocument) => {
      req.profileUser = userDocument;
      next();
    })
    .catch(() => {
      res.sendStatus("404");
    });
};

// Fetches data for a users profile
exports.profilePostsScreen = function (req, res) {
  Post.findByAuthorId(req.profileUser._id)
    .then((posts) => {
      res.send({
        title: `Profile for ${req.profileUser.username}`,
        currentPage: "posts",
        posts: posts,
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar,
        isFollowing: req.isFollowing,
        isVisitorsProfile: req.isVisitorsProfile,
        counts: {
          postCount: req.postCount,
          followerCount: req.followerCount,
          followingCount: req.followingCount,
        },
      });
    })
    .catch((error) => {
      res.sendStatus("404");
      console.log(error);
    });
};

// Fetches data for a users follower screen
exports.profileFollowersScreen = async function (req, res) {
  try {
    let followers = await Follow.getFollowersById(req.profileUser._id);
    res.json({
      currentPage: "followers",
      followers: followers,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorsProfile: req.isVisitorsProfile,
      counts: {
        postCount: req.postCount,
        followerCount: req.followerCount,
        followingCount: req.followingCount,
      },
    });
  } catch (error) {
    res.sendStatus("404");
    console.log("error in profileFollowerScreen", error);
  }
};

// Fetches data for a user's following screen
exports.profileFollowingScreen = async function (req, res) {
  try {
    let following = await Follow.getFollowingById(req.profileUser._id);
    res.json({
      currentPage: "following",
      following: following,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorsProfile: req.isVisitorsProfile,
      counts: {
        postCount: req.postCount,
        followerCount: req.followerCount,
        followingCount: req.followingCount,
      },
    });
  } catch (error) {
    res.sendStatus("404");
    console.log("error in profileFollowingScreen", error);
  }
};
exports.validateSession = function (req, res) {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    send({});
  }
};
