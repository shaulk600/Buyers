import { useEffect, useState } from "react";
import "./Product.css";
import type { ProductType } from "../../logic/ProductType";
import { getProducts, updateProduct } from "../../logic/api/product.api";
import type { UserType } from "../../logic/UserType";

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
        const user: UserType = { name: "John", password: "123", email: "john@email.com" };
        console.log("1",product);
        setProduct((product) => ({
            ...product, orderd: [...(product.orderd || []), user]
        }));
        console.log(product._id);
        console.log(id_product);
        const result = await updateProduct(id_product, product);
        console.log("res",result);
        if (result) {
            setIsOrdered(true);
        }
        console.log(isOrdered);
    }

    const removeUserFromProduct = async () => {
        const user: UserType = { name: "John", password: "123", email: "john@email.com" };
        setProduct((product) => ({
            ...product, orderd: (product.orderd || []).filter((u) => u.email !== user.email)
        }));
        const result = await updateProduct(product._id, product);
        if (result) {
            setIsOrdered(false);
        }
    }

    return (
        <div id="ProductDetailsPage">

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

                <label > קטגוריית :</label>
                <p>{product.category}</p>

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
    )
}
