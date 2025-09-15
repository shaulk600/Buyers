import './App.css'
import { useEffect } from "react"
import { getProducts } from "./logic/api/product.api"
import Product from './components/product/Product'

function App() {
    useEffect(() => {
      const fetchGetProduct = async () => {
        const resProducts = await getProducts();
        const storage = localStorage.getItem("products");
        if (!storage) {
          localStorage.setItem("products", JSON.stringify(resProducts));
        }
      }
      fetchGetProduct();
    }, []);

  return (
    <>
      <Product id_product={"68c6ba6144c94638c6d0cd88"}/>
    </>
  )
}

export default App
