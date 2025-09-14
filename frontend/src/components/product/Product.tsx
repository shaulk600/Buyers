import { useEffect, useState } from "react";
import "./ProductDetailsComponent.css";
import type { Product } from "../../logic/ProductType";
import { getProduct } from "../../logic/api/product.api";

export default function ProductDetailsComponent(id_product: string) {
    const [product, setProduct] = useState<Product>({
        id:"",
        imageProduct: "",
        title:"",
        description:"",
        regularPrice:"",
        groupPrice:"",
        category:"",
        orderd:[{}],
        comments:[{id:0, text:""}],
        quantityCustomers:"",
        quantityAllCustomers:""
    });

    useEffect(() => {
        const storage = localStorage.getItem("products");
        let products;
        if (storage) {
            products = JSON.parse(storage);
        }
        if (products) {
            const indexProduct = products.findIndex(p => p.id === id_product);
            const productFound = products[indexProduct];
            setProduct(productFound);
        }
        const fetchGetProduct = async () => {
            if (id_product) {
                const resProduct = await getProduct(id_product);
                setProduct(resProduct);
            }
        }
        fetchGetProduct();
    }, [product])

    // const [imageProduct, setImageProduct] = useState<string>("objProduct.imageProduct");
    // const [title, setTitle] = useState<string>("objProduct.title");
    // const [description, setDescription] = useState<string>("objProduct.description");
    // const [regularPrice, setRegularPrice] = useState<string>("objProduct.regularPrice");
    // const [groupPrice, setgroupPrice] = useState<string>("objProduct.groupPrice");
    // const [category, setCategory] = useState<string>("objProduct.category");
    // // const [orderd, setOrderd] = useState<string[]>(["objProduct.category"]);
    // const [comments, setComments] = useState<string[]>(["objProduct.category"]);

    return (
        <div id="ProductDetailsPage">

            <section className="img_product">

                <img src={product.imageProduct} alt="" />

            </section>

            <section className="product_details">
                <div>{objProduct.title}</div>

                <div className="divPrice">

                    <label htmlFor="">מחיר רגיל</label>
                    <p>{objProduct.regularPrice}</p>
                    <label htmlFor="">מחיר קבוצה</label>
                    <p>{objProduct.groupPrice}</p>

                </div>
                <div><p>{objProduct.description}</p></div>

                <label > קטגוריית :</label>
                <p>{objProduct.category}</p>

                <div className="CommentsOrders">
                    {/* יהיה פה קומפוננטה שתיקח את האובייקט של התגובות ו "תמרח" אותו על המסך */}
                </div>

                <footer className="btn_footer">
                    <button> הצטרף כעת להזמנה</button>
                    <button> תגובות מוצר מרוכשים</button>
                </footer>






            </section>

        </div>
    )
}
