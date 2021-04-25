/**
 *
 * @param username
 * @returns /add-follow/:username/
 */
export const addFollowURL = (username?: string) =>
  `/add-follow/${username ? username : ":username"}`;
/**
 *
 * @param username
 * @returns /remove-follow/:username/
 */
export const removeFollowURL = (username?: string) =>
  `/remove-follow/${username ? username : ":username"}`;

/**
 *
 * @returns /create-post/
 */
export const createPostURL = () => `/create-post/`;

/**
 *
 * @param id
 * @returns /post/:id/
 */
export const viewSinglePostURL = (id?: string) => `/post/${id ? id : ":id"}/`;

/**
 *
 * @param id
 * @returns /post/:id/edit/
 */
export const editPostURL = (id?: string) => `/post/${id ? id : ":id"}/edit/`; // GET edit screen, POST updates

/**
 *
 * @param id
 * @returns /post/:id/delete/
 */
export const deletePostURL = (id?: string) =>
  `/post/${id ? id : ":id"}/delete/`;

/**
 *
 * @returns /search/
 */
export const searchPostsURL = () => `/search/`;

/**
 *
 * @param username
 * @returns /profile/:username/posts/
 */
export const userProfilePostsURL = (username?: string) =>
  `/profile/${username ? username : ":username"}/posts/`;

/**
 *
 * @param username
 * @returns /profile/:username/followers/
 */
export const userProfileFollowersURL = (username?: string) =>
  `/profile/${username ? username : ":username"}/followers/`;

/**
 *
 * @param username
 * @returns /profile/:username/following/
 */
export const userProfileFollowingURL = (username?: string) =>
  `/profile/${username ? username : ":username"}/following/`;

/**
 *
 * @returns /homefeed/
 */
export const userHomefeedURL = () => `/homefeed/`;

/**
 *
 * @returns /register/
 */
export const userRegistrationURL = () => `/register/`;

/**
 *
 * @returns /login/
 */
export const userLoginURL = () => `/login/`;

/**
 *
 * @returns /does-username-exist/
 */
export const doesUsernameExistURL = () => `/does-username-exist/`;

/**
 *
 * @returns /does-email-exist/
 */
export const doesEmailExistURL = () => `/does-email-exist/`;

/**
 *
 * @returns /logout/
 */
export const userLogoutURL = () => `/logout/`;
