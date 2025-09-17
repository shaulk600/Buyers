import { useState, type Dispatch, type SetStateAction } from "react"
import Products from "../../components/products/Products"
import Categories from "../../components/products/Categories";
import type { ProductType } from "../../logic/ProductType";

interface Props {
  products: ProductType[]
  setProducts: Dispatch<SetStateAction<ProductType[]>>
}

export default function ProductsPage({products, setProducts}: Props) {
    const [category, setCategory] = useState<string>("all");
    
  return (
    <>
    <Categories onSelectCategory={setCategory}/>
    <Products 
      category={category} 
      products={products}
      setProducts={setProducts}
      />
    </>
  )
}
