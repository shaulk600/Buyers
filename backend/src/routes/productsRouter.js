import express from "express";
import {
  getAllProducts,
  getProduct,
  addNewProduct,
  deleteProductById,
  updateProductById,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addNewProduct);
router.delete("/", deleteProductById);
router.put("/", updateProductById);

export default router
