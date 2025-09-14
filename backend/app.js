import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import {connectToPurchasingGroupsDB} from './dbConfig/dbConnection.js'
import userRoutes from './src/routes/usersRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("hello from the server!");
});


app.use('/users',userRoutes);


connectToPurchasingGroupsDB()

app.listen(PORT, () => {
    console.log(`server run on http://localhost:3000 >>>`);
});