import { useState } from "react"
import Products from "../../components/products/Products"
import Categories from "../../components/products/Categories";

export default function ProductsPage() {
    const [category, setCategory] = useState<string>("all");
    
  return (
    <>
    <Categories onSelectCategory={setCategory}/>
    <Products category={category}/>
    </>
  )
}
