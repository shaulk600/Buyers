import { connectToPurchasingGroupsDB } from "../../dbConfig/dbConnection.js";
import { ObjectId } from "mongodb";

const db = await connectToPurchasingGroupsDB();
const users = db.collection("users");

export async function getAllUsers() {
  return users.find().toArray();
}

export async function getUserById(id) {
  return users.findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmail(email) {
  return users.findOne({ email: email });
}

export async function addUser(userData) {
  const result = await users.insertOne(userData);
  return users.findOne({ _id: result.insertedId });
}

export async function deleteUser(id) {
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
