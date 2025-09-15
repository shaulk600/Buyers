import express from "express";
import cors from "cors";
import { config } from "dotenv";
import {connectToPurchasingGroupsDB} from './dbConfig/dbConnection.js'
import userRoutes from './src/routes/usersRouter.js';
import productsRouter from "./src/routes/productsRouter.js";
import access from "./src/routes/authRouter.js";
config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use('/access',access)

// midellwer check token

app.use('/buyers/users',userRoutes);

app.use("/buyers/products", productsRouter);

app.listen(PORT, () => {
    console.log(`server run on http://localhost:3000 >>>`);
});