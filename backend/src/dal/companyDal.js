import { ObjectId } from "mongodb";
import { connectToPurchasingGroupsDB } from "../../dbConfig/dbConnection.js";


export async function getCompanies() {
    const db = connectToPurchasingGroupsDB();
    return (await db).collection("companies").find().toArray();
}


export async function getCompanyById(id) {
    const db = connectToPurchasingGroupsDB();
    return (await db).collection("companies").findOne({_id:new ObjectId(id)});
}


export async function addCompany(companyData) {
    const db = connectToPurchasingGroupsDB();
    const result = await db.collection("companies").insertOne(companyData);
    return db.collection("companies").findOne({ _id: result.insertedId });
}