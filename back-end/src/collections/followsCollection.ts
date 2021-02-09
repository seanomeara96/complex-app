import client from "../db";
const followsCollection = client.db().collection("follows");
export default followsCollection;
