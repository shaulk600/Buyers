import express from "express";
import cors from "cors";
import { config } from "dotenv";
import productsRouter from "./src/routes/productsRouter.js";

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`server run on http://localhost:3000 >>>`);
});
