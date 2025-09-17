import { useContext, useEffect, useState } from "react";
import "./ProductDetailsComps.css";
import type { ProductType } from "../../logic/ProductType";
import { getProducts, updateProduct } from "../../logic/api/product.api";
import { UserContext } from "../../context/UserContext";
import type { Order } from "../../context/UserContext";

export default function ProductDetailsComps({ id_product }: { id_product: string }) {
  const [product, setProduct] = useState<ProductType>({
    _id: "",
    title: "",
    description: "",
    regular_price: 0,
    group_price: 0,
    image: "",
    category: "",
    orderd: [],
    comments: [{ id: 0, text: "" }],
    quantityCustomers: 0,
    quantityAllCustomers: 0
  });

  const userUseContext = useContext(UserContext);
  const [isOrdered, setIsOrdered] = useState(false);

  // פונקציה לחישוב סטטוס המוצר
  const getProductStatus = (): string => {
    if (product.quantityCustomers >= product.quantityAllCustomers) {
      return "Closed";
    }
    if (isOrdered) {
      return "Already Joined";
    }
    return "Open";
  };

  useEffect(() => {
    const storage = localStorage.getItem("products");
    let products;
    if (storage) {
      products = JSON.parse(storage);
    }
    if (products) {
      const indexProduct = products.findIndex((p: ProductType) => p._id === id_product);
      if (indexProduct >= 0) {
        setProduct(products[indexProduct]);
      }
    }
    const fetchGetProduct = async () => {
      if (id_product) {
        const resProducts = await getProducts();
        const findIndex = resProducts.findIndex((p: ProductType) => p._id === id_product);
        if (findIndex >= 0) {
          setProduct(resProducts[findIndex]);
        }
      }
    };
    fetchGetProduct();
  }, []);

  const addUserToProduct = async () => {
    if (!userUseContext?.user) {
      // אולי הודעת הבהרה - מעבירים אותך לתפריט התחברות...
      window.location.href = "/signIn";
      return;
    }

    const updatedProduct: ProductType = {
      ...product,
      orderd: [...(product.orderd || []), userUseContext.user],
      quantityCustomers: product.quantityCustomers + 1
    };

    const order: Order = {
      id: product._id,
      productName: product.title,
      date: new Date().toUTCString(),
      status: "By order",
    };

    if (userUseContext.user) {
      userUseContext.setUser({
        ...userUseContext.user,
        orders: [...userUseContext.user.orders, order]
      });
    }

    setProduct(updatedProduct);
    setIsOrdered(true);

    try {
      await updateProduct(updatedProduct._id, updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const removeUserFromProduct = async () => {
    if (!userUseContext?.user?.email) return;
    console.log('userUseContext.user',userUseContext.user);
    const updatedProduct: ProductType = {
      ...product,
      orderd: (product.orderd || []).filter(
        (u) => u.email !== userUseContext.user.email
      ),
      quantityCustomers: Math.max(product.quantityCustomers - 1, 0)
    };

    setProduct(updatedProduct);
    setIsOrdered(false);

    try {
      await updateProduct(updatedProduct._id, updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // בדיקה אם המשתמש כבר הצטרף
  useEffect(() => {
    if (
      userUseContext?.user &&
      product.orderd?.some((u) => u.email === userUseContext.user.email)
    ) {
      setIsOrdered(true);
    } else {
      setIsOrdered(false);
    }
  }, [product, userUseContext]);

  return (
    <div id="ProductDetailsPage">
      {/* Status */}
      <h3 className={`product-status ${getProductStatus().toLowerCase()}`}>
        {`Status: ${getProductStatus()}`}
      </h3>

      {/* Product Title */}
      <h1 className="product-title">{product.title}</h1>

      {/* Product Image */}
      <div className="img_product">
        {product.image ? (
          <img src={product.image} alt={`${product.title}-image`} />
        ) : (
          <p>{`image :)`}</p>
        )}
      </div>

      {/* Prices & Quantities */}
      <section className="product-info">
        <div className="price-box">
          <h4>Regular Price</h4>
          <p>{product.regular_price} ₪</p>
          <h4>Group Price</h4>
          <p>{product.group_price} ₪</p>
        </div>

        <div className="quantity-box">
          <h4>Participants</h4>
          <p>{product.quantityCustomers} / {product.quantityAllCustomers}</p>
        </div>
      </section>

      {/* Description */}
      <div className="product-description">
        <p>{product.description}</p>
      </div>

      {/* Join Button */}
      <footer className="btn_footer">
        {isOrdered ? (
          <button onClick={removeUserFromProduct} className="cancel-btn">
            בטל הצטרפות
          </button>
        ) : (
          <button
            onClick={addUserToProduct}
            className="join-btn"
            disabled={getProductStatus() === "Closed"}
          >
            הצטרף כעת להזמנה
          </button>
        )}
      </footer>
    </div>
  );
}