import express from "express";
import {
  addNewProduct,
  deleteProductById,
  updateProductById,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/", addNewProduct);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router