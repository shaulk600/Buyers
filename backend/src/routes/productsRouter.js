import express from "express";
import {
  getAllProducts,
  getProduct,

} from "../controllers/productsController.js";

const router = express.Router();
// routes for products
router.get("/", getAllProducts);
router.get("/:id", getProduct);


export default router
