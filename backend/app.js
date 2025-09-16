import express from "express";
import cors from "cors";
import { config } from "dotenv";
import {connectToPurchasingGroupsDB} from './dbConfig/dbConnection.js'
import userRoutes from './src/routes/usersRouter.js';
import productsRouter from "./src/routes/productsRouter.js";
import access from "./src/routes/authRouter.js";
import {middleware} from "./src/middleware/middleware.js"
config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use('/access',access)

app.use('/buyers',middleware)

app.use('/buyers/users',userRoutes);

app.use("/buyers/products", productsRouter);

connectToPurchasingGroupsDB();

app.listen(PORT, () => {
    console.log(`server run on http://localhost:3000 >>>`);
});