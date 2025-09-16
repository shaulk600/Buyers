import "./App.css";
import { useEffect } from "react";
import { getProducts } from "./logic/api/product.api";
import Product from "./components/product/Product";
import RoutesPage from "./routers/RoutesPage";
import HeaderComps from "./components/header/HeaderComps";
import { BrowserRouter } from "react-router-dom";
import FooterComps from "./components/footer/FooterComps";

function App() {
  useEffect(() => {
    const fetchGetProduct = async () => {
      const resProducts = await getProducts();
      const storage = localStorage.getItem("products");
      if (!storage) {
        localStorage.setItem("products", JSON.stringify(resProducts));
      }
    };
    fetchGetProduct();
  }, []);

  return (
    <BrowserRouter>
      <HeaderComps />
      <FooterComps />
    </BrowserRouter>
  );
}

export default App;
