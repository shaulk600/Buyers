import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../dal/productsDal.js";

// get products

export async function getAllProducts(req, res) {
  try {
    const products = await getProducts();
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "No product found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error("Get all products error:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

//get product by id
export async function getProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json("There is a problem with the server. Try later.");
  }
}

//add product
export async function addNewProduct(req, res) {
  try {
    const product = req.body;

    if (!product || Object.keys(product).length === 0) {
      return res.status(404).json({ msg: "Product details are missing" });
    }

    const result = await addProduct(product);
    res.status(201).json(result);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

//delete product
export async function deleteProductById(req, res) {
  try {
    const productId = req.params.id;
    const result = await deleteProduct(productId);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

//update product
export async function updateProductById(req, res) {
  const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Missing id' });
  try {
    const result = await updateProduct(id, { ...req.body });

    if (!result || result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ msg: "Server error" });
  }
}
