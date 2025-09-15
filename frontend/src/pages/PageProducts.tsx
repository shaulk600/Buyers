import { useState } from "react"
import Products from "../components/products/Products"

export default function PageProducts() {
    const [category, setCategory] = useState<string>("all");


  return (
    <>
    <Products category={category}/>
    </>
  )
}
