import { connectToPurchasingGroupsDB } from "../../dbConfig/dbConnection.js";
import { ObjectId } from "mongodb";


export async function getAllUsers() {
    const db = await connectToPurchasingGroupsDB();
    return db.collection("users").find().toArray();
}


export async function getUserById(id) {
    const db = await connectToPurchasingGroupsDB();
    return db.collection("users").findOne({_id:new ObjectId(id)})
}


export async function addUser(userData){
    const db = await connectToPurchasingGroupsDB();
    const result = await db.collection("users").insertOne(userData);
    return db.collection("users").findOne({ _id: result.insertedId });
  
}



export async function deleteUser(id) {
  const db = await connectToPurchasingGroupsDB();
  const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}