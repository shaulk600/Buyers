import './App.css'
import { useEffect } from "react"
import { getProducts } from "./logic/api/product.api"
import Header from './components/header/Header'
import ProductsPage from './pages/productsPage/ProductsPage'
import Footer from './components/footer/Footer'

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
      <Header/>
      <ProductsPage/>
      <Footer/>
    </>
  )
}

export default App