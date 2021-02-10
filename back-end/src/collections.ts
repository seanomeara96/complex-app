import db from "./db";
function fetchCollection(collectionName: string) {
  return db.client!.db().collection(collectionName);
}
export const usersCollection = fetchCollection("users"),
  postsCollection = fetchCollection("posts"),
  followsCollection = fetchCollection("folows");
