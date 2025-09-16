import { useEffect, useState } from "react"
import type { ProductType } from "../../logic/ProductType"
import { getProducts } from "../../logic/api/product.api"
import Product from "../product/Product";

export default function Products({ category }: { category: string }) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState("")
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

    const filteredProducts = products.filter((f)=>{
        f.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <div className="comp-products">
        {
            products.map(product => (
                <Product id_product={product._id}/>
            ))
        }
        <div>
            <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button >Search</button>
        </div>
        
    </div>
  )
}
