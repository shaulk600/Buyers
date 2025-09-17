import { ObjectId } from "mongodb";
import { connectToPurchasingGroupsDB } from "../../dbConfig/dbConnection.js";

export async function getProducts() {
    try {
        const db = await connectToPurchasingGroupsDB();
        const products = await db.collection("products").find().toArray();
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getProductsByCategory(category) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const products = await db.collection("products").find({ category: category }).toArray();
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function addProduct(product) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const result = await db.collection("products").insertOne(product);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProduct(id, product) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const result = await db.collection("products").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: product }
        );
        return result;
    } catch (error) {
        console.error("Update product error:", error);
        throw error;
    }
}

export async function deleteAllProducts() {
    try {
        const db = await connectToPurchasingGroupsDB();
        const result = await db.collection("products").deleteMany({});
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function insertManyProducts(productsArray) {
    try {
        const db = await connectToPurchasingGroupsDB();
        const result = await db.collection("products").insertMany(productsArray);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
