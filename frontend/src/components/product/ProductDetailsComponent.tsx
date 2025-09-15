import { useState } from "react";
import "./ProductDetailsComponent.css";
import type { Product } from "../../logic/ProductType";

export default function ProductDetailsComponent(objProduct: Product) {

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

                <img src={imageProduct} alt="" />

            </section>

            <section className="product_details">
                <div>{title}</div>

                <div className="divPrice">

                    <label htmlFor="">מחיר רגיל</label>
                    <p>{regularPrice}</p>
                    <label htmlFor="">מחיר קבוצה</label>
                    <p>{groupPrice}</p>

                </div>
                <div><p>{description}</p></div>

                <label > קטגוריית :</label>
                <p>{category}</p>

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
