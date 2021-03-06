import Post from "./modules/post-modules/_postBase";
import create from "./modules/post-modules/create";
import update from "./modules/post-modules/update";
import actuallyUpdate from "./modules/post-modules/actuallyUpdate";
import cleanUp from "./modules/post-modules/cleanUp";
import validate from "./modules/post-modules/validate";
import reusablePostQuery from "./modules/post-modules/reusablePostQuery";
import findSingleById from "./modules/post-modules/findSingleById";
import findByAuthorId from "./modules/post-modules/findByAuthorId";
import deletePost from "./modules/post-modules/deletePost";
import search from "./modules/post-modules/search";
import countPostsByAuthor from "./modules/post-modules/countPostsByAuthor";
import getFeed from "./modules/post-modules/getFeed";
Post.prototype.create = create;
Post.prototype.update = update;
Post.prototype.actuallyUpdate = actuallyUpdate;
Post.prototype.cleanUp = cleanUp;
Post.prototype.validate = validate;
Post.prototype.reusablePostQuery = reusablePostQuery;
Post.prototype.findSingleById = findSingleById;
Post.prototype.findByAuthorId = findByAuthorId;
Post.prototype.deletePost = deletePost;
Post.prototype.search = search;
Post.prototype.countPostsByAuthor = countPostsByAuthor;
Post.prototype.getFeed = getFeed;
export default Post;
