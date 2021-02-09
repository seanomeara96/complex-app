import client from "../db";
const postsCollection = client.db().collection("posts");
export default postsCollection;
