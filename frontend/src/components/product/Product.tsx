import { useEffect, useState } from "react";
import "./Product.css";
import type { ProductType } from "../../logic/ProductType";
import { getProducts, updateProduct } from "../../logic/api/product.api";
import { useUser, type Order, type UserFull } from "../../context/UserContext";
import { Link, useNavigate } from "react-router";
import { getToken } from "../../logic/cookies/Token";

export default function Product({ id_product }: { id_product: string }) {
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
    quantityAllCustomers: 0,
  });

  const { user, setUser } = useUser();
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  // טעינת המשתמש מה-localStorage אם context ריק
  useEffect(() => {
    if (!user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Failed to parse user from localStorage", err);
        }
      }
    }
  }, [user, setUser]);


  // --- טעינת מוצר מה־storage / שרת ---
  useEffect(() => {
    const storage = localStorage.getItem("products");
    if (storage) {
      const products = JSON.parse(storage);
      const productFound = products.find((p: ProductType) => p._id === id_product);
      if (productFound) setProduct(productFound);
    }

    const fetchGetProduct = async () => {
      if (!id_product) return;
      const resProducts = await getProducts();
      const resProduct = resProducts.find((p: ProductType) => p._id === id_product);
      if (resProduct) setProduct(resProduct);
    };

    fetchGetProduct();
  }, [id_product]);

  // --- הצטרפות להזמנה ---
  const addUserToProduct = async () => {
    if (!user) {
      navigate("/signIn"); // ניווט SPA נקי
      return;
    }

    const updatedProduct: ProductType = {
      ...product,
      orderd: [...(product.orderd || []), user],
    };

    const order: Order = {
      id: product._id,
      productName: product.title,
      date: new Date().toUTCString(),
      status: "By order",
    };

    setUser({
      ...user,
      orders: [...(user.orders || []), order],
    });

    setProduct(updatedProduct);
    setIsOrdered(true);

    try {
      await updateProduct(updatedProduct._id, updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // --- ביטול הצטרפות להזמנה ---
  const removeUserFromProduct = async () => {
    if (!user?.email) return;

    const updatedProduct: ProductType = {
      ...product,
      orderd: (product.orderd || []).filter((u) => u.email !== user.email),
    };

    setProduct(updatedProduct);
    setIsOrdered(false);

    try {
      await updateProduct(updatedProduct._id, updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // --- בדיקה אם המשתמש כבר הצטרף ---
  useEffect(() => {
    if (user?.email && product.orderd?.some((u) => u.email === user.email)) {
      setIsOrdered(true);
    } else {
      setIsOrdered(false);
    }
  }, [product, user]);

  return (
    <div id="card-product">

      <div className="img_product">
        <img src={product.image || undefined} alt={`${product.title}-image`} />
      </div>


      {/* 1 */}
      <section className="product_details">
        <h2>{product.title}</h2>

        <div className="divPrice">
          <p>Price: {product.regular_price}₪</p>
          <p>Group Price: {product.group_price}₪</p>
        </div>


        <div className="btn_footer">
          {isOrdered ? (
            <button className="btn-product" onClick={removeUserFromProduct}>
              בטל הצטרפות
            </button>
          ) : (
            <button className="btn-product" onClick={addUserToProduct}>
              הצטרף כעת להזמנה
            </button>
          )}
          <Link className="link-button" to={`/product/${product._id}`}>
            Product details
          </Link>
        </div>
      </section>


      {/* 2 */}
      {/* <section className="product_details">
                <h2>{product.title}</h2>

                <span className="divPrice">
                    <p className="price">{product.group_price}$</p>
                    <p ><s>{product.regular_price}$</s></p>
                </span>

                <div className="btn_footer">
                    {isOrdered  ? 
                        (<button className="btn-product"
                            onClick={removeUserFromProduct}
                        >
                             בטל הצטרפות
                        </button>
                        ): (
                        <button className="btn-product"
                            onClick={addUserToProduct}
                        >
                            הצטרף כעת להזמנה
                        </button>
                        )
                    }
                    <Link className="link-button" to={`/product/${product._id}`}>Product details</Link>
                </div>
            </section> */}

    </div>
  );
}