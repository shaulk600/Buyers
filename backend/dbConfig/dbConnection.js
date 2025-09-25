import { MongoClient,Db} from "mongodb";
import { config } from "dotenv";
config()

// connect to DB
const client = new MongoClient(process.env.DB_CONNECTION)

/**
 * @type {Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */
export async function connectToPurchasingGroupsDB() {
    if (!db) {
        try {
            await client.connect();

            db = client.db("Buyers-Web");
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err.message);
            throw err;
        }
    }
    return db;
}

