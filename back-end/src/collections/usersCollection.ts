import client from "../db";
const usersCollection = client.db().collection("users");
export default usersCollection;
