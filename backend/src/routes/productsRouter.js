import express from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  deleteProductById,
  updateProductById,
} from "../controllers/productsController.js";

const router = express.Router();
// routes for products
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addNewProduct);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router
