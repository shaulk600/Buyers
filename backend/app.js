import express from "express";
import cors from "cors";
import { config } from "dotenv";
import {connectToPurchasingGroupsDB} from './dbConfig/dbConnection.js'
import userRoutes from './src/routes/usersRouter.js';
import productsRouter from "./src/routes/productsRouter.js";
config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("hello from the server!");
});


app.use('/users',userRoutes);

app.use("/products", productsRouter);

connectToPurchasingGroupsDB()

app.listen(PORT, () => {
    console.log(`server run on http://localhost:3000 >>>`);
});