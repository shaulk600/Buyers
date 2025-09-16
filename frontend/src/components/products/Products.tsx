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
        const productsStorage: ProductType[] = storage ? JSON.parse(storage) : [];

        const fetchProducts = async () => {
            const resProducts = await getProducts();
            localStorage.setItem("products", JSON.stringify(resProducts));
            return resProducts;
        }

        const getProductsByCategory = async () => {
            const allProducts = productsStorage.length ? productsStorage : await fetchProducts();
            if (category.toLowerCase() === "all") {
                setProducts(allProducts);
            } else {
                setProducts(allProducts.filter(p => p.category === category));
            }
        }

        getProductsByCategory();
    }, [category]);


    const filteredProducts = products.filter((f)=>{
        f.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <div className="comp-products">
        {
            products.map(product => (
                <Product key={product._id} id_product={product._id}/>
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
