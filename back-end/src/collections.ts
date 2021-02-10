import client from "./db";
function fetchCollection(collectionName: string) {
  return client.db().collection(collectionName);
}
export const usersCollection = fetchCollection("users"),
  postsCollection = fetchCollection("posts"),
  followsCollection = fetchCollection("folows");
