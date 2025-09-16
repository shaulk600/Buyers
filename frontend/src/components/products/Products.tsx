import { useEffect,useState, type Dispatch, type SetStateAction } from "react"
import type { ProductType } from "../../logic/ProductType"
import Product from "../product/Product";


interface Props {
    category: string;
    products: ProductType[]
  setProducts: Dispatch<SetStateAction<ProductType[]>>
}

export default function Products({ category, products, setProducts }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
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
