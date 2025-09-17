import { useContext, useEffect, useState } from "react";
import "./Product.css";
import type { ProductType } from "../../logic/ProductType";
import { getProducts } from "../../logic/api/product.api";
import { updateProduct } from "../../logic/api/product.api";
import { UserContext } from "../../context/UserContext"; 
import type { Order } from "../../context/UserContext";

export default function Product({ id_product }: { id_product: string }) {
    const [product, setProduct] = useState<ProductType>({
        _id:"",
        title:"",
        description:"",
        regular_price:0,
        group_price:0,
        image: "",
        category:"",
        orderd: [],
        comments:[{id:0, text:""}],
        quantityCustomers:0,
        quantityAllCustomers:0
    });
    const userUseContext = useContext(UserContext);
    console.log(userUseContext);
    const [ isOrdered, setIsOrdered ] = useState(false);

    useEffect(() => {
        const storage = localStorage.getItem("products");
        let products;
        if (storage) {
            products = JSON.parse(storage);
        }
        if (products) {
            const indexProduct = products.findIndex((p: ProductType) => p._id === id_product);
            const productFound = products[indexProduct];
            setProduct(productFound);
        }
        const fetchGetProduct = async () => {
            if (id_product) {
                const resProducts = await getProducts();
                const findIndex = resProducts.findIndex((p: ProductType) => p._id === id_product);
                const resProduct = resProducts[findIndex];
                setProduct(resProduct);
            }
        }
        fetchGetProduct();
    }, []);

    const addUserToProduct = async () => {
    if (!userUseContext?.user) {
        window.location.href = "/signIn";
        return;
    }

    const updatedProduct: ProductType = {
        ...product,
        orderd: [...(product.orderd || []), userUseContext.user],
    };
    const order: Order = {
        id: product._id,
        productName: product.title,
        date: new Date().toUTCString(),
        status: "By order",
    }
    userUseContext.user.orders.push(order);
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

    const updatedProduct: ProductType = {
        ...product,
        orderd: (product.orderd || []).filter(
        (u) => u.email !== userUseContext.user.email),
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

            <label > קטגוריית :</label>
            <p>{product.category}</p>

            <section className="img_product">

                <img src={product.image || undefined} alt={`${product.title}-image`} />

            </section>
            <section className="product_details">
                <div>{product.title}</div>

                <div className="divPrice">

                    <label htmlFor="">מחיר רגיל</label>
                    <p>{product.regular_price}</p>
                    <label htmlFor="">מחיר קבוצה</label>
                    <p>{product.group_price}</p>

                </div>
                <div><p>{product.description}</p></div>


                <footer className="btn_footer">
                    {isOrdered  ? 
                        (<button 
                            onClick={removeUserFromProduct}
                        >
                             בטל הצטרפות
                        </button>
                        ): (
                        <button
                            onClick={addUserToProduct}
                        >
                            הצטרף כעת להזמנה
                        </button>
                        )
                    }
                </footer>
            </section>
    </div>
  );
}
