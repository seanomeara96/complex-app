import User from "../models/User";
import Post from "../models/Post";
import Follow from "../models/Follow";
// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { send } from "@sendgrid/mail";

export const doesUsernameExist = function (req: Request, res: Response) {
  User.prototype
    .findByUserName(req.body.username)
    .then(() => {
      res.json(true);
    })
    .catch(() => {
      res.json(false);
    });
};
export const doesEmailExist = async function (req: Request, res: Response) {
  let emailBool = await User.prototype.doesEmailExist(req.body.email);
  res.json(emailBool);
};
export const sharedProfileData = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let isVisitorsProfile = false;
  let isFollowing = false;
  if (req.session?.user) {
    isVisitorsProfile = req.profileUser._id.equals(req.session.user._id);
    isFollowing = await Follow.prototype.isVisitorFollowing(
      req.profileUser._id,
      req.visitorId!
    );
  }
  req.isVisitorsProfile = isVisitorsProfile;
  req.isFollowing = isFollowing;
  // Retreive post, follower, and following counts
  let postCountPromise = Post.prototype.countPostsByAuthor(req.profileUser._id);
  let followerCountPromise = Follow.prototype.countFollowersById(
    req.profileUser._id
  );
  let followingCountPromise = Follow.prototype.countFollowingById(
    req.profileUser._id
  );
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

export const mustBeLoggedIn = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session?.user) {
    next();
  } else {
    req.session?.save(() => {
      res.status(401).json({ errors: ["log in first dumb ass"] });
    });
  }
};

export const login = (req: Request, res: Response) => {
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
      req.session!.user = authenticatedUser;
      req.session?.save(() => {
        res.send(authenticatedUser);
      });
    })
    .catch((e) => {
      req.session?.save(() => {
        res.status(500).send(e); // Internal Server Error
      });
    });
};

export const logout = (req: Request, res: Response) => {
  req.session?.destroy(() => {
    res.sendStatus(200);
  });
};

export const register = (req: Request, res: Response) => {
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
      req.session!.user = registeredUser;
      console.log(req.session?.user);
      req.session?.save(() => {
        res.status(201).send(registeredUser);
      });
    })
    .catch((regErrors: string[]) => {
      regErrors.forEach((error) => {
        console.error(error);
      });
      req.session?.save(() => {
        res.sendStatus(500);
      });
    });
};

// Fetches HomeFeed
export const home = async (req: Request, res: Response) => {
  if (req.session?.user) {
    console.log("fetching homefeed...");
    let posts = await Post.prototype.getFeed(req.session.user._id);
    console.log("these are the posts", posts);
    res.json(posts);
  } else {
    res.send({ errors: ["error fetching feed"] });
  }
};

// Checks if a user exists in the database
export const ifUserExists = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  User.prototype
    .findByUserName(req.params.username)
    .then((userDocument) => {
      req.profileUser = userDocument;
      next();
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// Fetches data for a users profile
export const profilePostsScreen = function (req: Request, res: Response) {
  Post.prototype
    .findByAuthorId(req.profileUser._id)
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
      res.sendStatus(404);
      console.log(error);
    });
};

// Fetches data for a users follower screen
export const profileFollowersScreen = async function (
  req: Request,
  res: Response
) {
  try {
    let followers = await Follow.prototype.getFollowersById(
      req.profileUser._id
    );
    res.send({
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
    res.sendStatus(404);
    console.log("error in profileFollowerScreen", error);
  }
};

// Fetches data for a user's following screen
export const profileFollowingScreen = async function (
  req: Request,
  res: Response
) {
  try {
    let following = await Follow.prototype.getFollowingById(
      req.profileUser._id
    );
    res.send({
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
    res.sendStatus(404);
    console.log("error in profileFollowingScreen", error);
  }
};
export const validateSession = function (req: Request, res: Response) {
  if (req.session?.user) {
    res.send(req.session?.user);
  } else {
    res.send({});
  }
};
export const setSelectedProfile = function (req: Request, res: Response) {
  req.selectedProfile = req.params.username;
  res.send(req.selectedProfile);
};
