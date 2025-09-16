import { useEffect, useState } from "react"
import type { ProductType } from "../../logic/ProductType"
import { getProducts } from "../../logic/api/product.api"
import Product from "../product/Product";

export default function Products({ category }: { category: string }) {
    const [products, setProducts] = useState<ProductType[]>([]);
    console.log(category);
    console.log(products);
    
    useEffect(() => {
    const storage = localStorage.getItem("products");
    if (storage) {
        const productsStorage: ProductType[] = JSON.parse(storage);
        if (category.toLowerCase() === "all") {
            setProducts(productsStorage);
        } else {
            const productsCategory = productsStorage.filter(
                (product) => product.category === category
            );
            setProducts(productsCategory);
        }
    }
    
    const fetchGetProduct = async () => {
        const resProducts = await getProducts();
        console.log("res",resProducts);
        if (category.toLowerCase() === "all") {
            setProducts(resProducts);
        } else {
            const productsCategory = resProducts.filter(
            (product) => product.category === category
            );
            setProducts(productsCategory);
        }
        localStorage.setItem("products", JSON.stringify(resProducts));
    };

    fetchGetProduct();
    }, [category]);

  return (
    <div className="comp-products">
        {
            products.map(product => (
                <Product id_product={product._id}/>
            ))
        }
    </div>
  )
}
