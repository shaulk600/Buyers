import "./App.css";

import { useEffect, useState } from "react";
import { getProducts } from "./logic/api/product.api";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import ProductsPage from "./pages/productsPage/ProductsPage";
import HomePage from "./pages/home/homePage";
import RegisterPage from "./pages/register/RegisterPage";
import CartPage from "./pages/cart/cartPage";
import AboutPage from "./pages/about/aboutPage";
import ContactUsPage from "./pages/contactUs/contactUsPage";
import LoginPage from "./pages/login/LoginPage";
import UserProfilePage from "./pages/profile/UserProfilePage";

import { Route, Routes } from "react-router";
import { UserProvider } from "./context/UserContext";
import type { ProductType } from "./logic/ProductType";
import ProductDinamicPage from "./pages/productDinamic/productDinamicPage";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchGetProduct = async () => {
      const resProducts = await getProducts();
      setProducts(resProducts);
    };
    fetchGetProduct();
    console.log(products);
  }, []);

  return (
    <main>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/signUp" element={<RegisterPage />}></Route>
          <Route path="/signIn" element={<LoginPage />}></Route>
          <Route path="/products" element={ <ProductsPage products={products}/>}></Route>
          <Route path="/product/:id" element={<ProductDinamicPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contactUs" element={<ContactUsPage />}></Route>
          <Route path="/profile" element={<UserProfilePage />}></Route>
        </Routes>
        <Footer />
      </UserProvider>
    </main>
  );
}

export default App;
