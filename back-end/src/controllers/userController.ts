import User from "../models/User";
import Post from "../models/Post";
import Follow from "../models/Follow";
// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import { send } from "@sendgrid/mail";
/**
 * Checks to see if the submitted username exists in the datbase
 *
 * @param req
 * @param res
 */
export const doesUsernameExist = async function (req: Request, res: Response) {
  try {
    const response = await User.prototype.findByUserName(req.body.username);
    if (typeof response == "object") {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    console.log("does username exist err", err);
    res.sendStatus(500);
  }
};
/**
 * Checks to see if the submitted email exists in the database
 * @param req
 * @param res
 */
export const doesEmailExist = async function (req: Request, res: Response) {
  try {
    let emailBool = await User.prototype.doesEmailExist(req.body.email);
    res.json(emailBool);
  } catch (err) {
    res.sendStatus(500);
  }
};
/**
 * Requests all the data that is shared on a user's profile page
 * @param req
 * @param res
 * @param next
 */
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
/**
 * User must be logged in to progress middleware
 *
 * @param req
 * @param res
 * @param next
 */
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

/**
 * logs the user in, requires a username & password
 *
 * @param req express request object
 * @param res express response object
 */
export const login = async (req: Request, res: Response) => {
  let user = new User(req.body);
  try {
    await user.login();
    let authenticatedUser = {
      avatar: user.avatar,
      username: user.data.username,
      _id: user.data._id,
    };
    req.session!.user = authenticatedUser;
    req.session?.save(() => {
      res.send(authenticatedUser);
    });
  } catch (e) {
    req.session?.save(() => {
      res.status(500).send(e); // Internal Server Error
    });
  }
};
/**
 * Requests the destruction of the user's session
 *
 * @param req
 * @param res
 */
export const logout = (req: Request, res: Response) => {
  req.session?.destroy(() => {
    res.sendStatus(200);
  });
};
/**
 * registers a new user, requires a username email and password on the request body
 *
 * @param req express request object
 * @param res express response object
 */
export const register = async (req: Request, res: Response) => {
  let user = new User(req.body);
  try {
    await user.register();

    let registeredUser = {
      username: user.data.username,
      avatar: user.avatar,
      _id: user.data._id,
    };
    req.session!.user = registeredUser;
    req.session?.save(() => {
      res.status(201).send(registeredUser);
    });
  } catch (regErrors) {
    regErrors.forEach((error: any) => {
      console.error(error);
    });
    req.session?.save(() => {
      res.sendStatus(500);
    });
  }
};

/**
 * requests a users homefeed
 *
 * @param req
 * @param res
 */
export const home = async (req: Request, res: Response) => {
  if (req.session?.user) {
    let posts = await Post.prototype.getFeed(req.session.user._id);
    res.json(posts);
  } else {
    res.send({ errors: ["error fetching feed"] });
  }
};

/**
 * Checks if a user exists in the database
 *
 * @param req
 * @param res
 * @param next
 */
export const ifUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDocument = await User.prototype.findByUserName(
      req.params.username
    );
    req.profileUser = userDocument;
    next();
  } catch (err) {
    res.sendStatus(404);
  }
};

/**
 * Fetches data for a users profile
 *
 * @param req
 * @param res
 */
export const profilePostsScreen = async (req: Request, res: Response) => {
  try {
    const posts = await Post.prototype.findByAuthorId(req.profileUser._id);
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
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};

/**
 * Fetches data for a users follower screen
 *
 * @param req
 * @param res
 */
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

/**
 *  Fetches data for a user's following screen
 *
 * @param req express request object
 * @param res express response object
 * */
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
