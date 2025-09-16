import { useEffect, type Dispatch, type SetStateAction } from "react"
import type { ProductType } from "../../logic/ProductType"
import Product from "../product/Product";

interface Props {
    category: string;
    products: ProductType[]
  setProducts: Dispatch<SetStateAction<ProductType[]>>
}

export default function Products({ category, products, setProducts }: Props) {
    useEffect(() => {
    
    const fetchGetProduct = async () => {
        
        if (category.toLowerCase() !== "all") {
            const productsCategory = products.filter(
                (product) => product.category === category
            );
            setProducts(productsCategory);
        }
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
