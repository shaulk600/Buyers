import express from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  deleteProductById,
  updateProductById

} from "../controllers/productsController.js";

const router = express.Router();
// routes for products
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addNewProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);


export default router
