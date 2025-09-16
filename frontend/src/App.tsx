import "./App.css";
import { useEffect, useContext } from "react";
import { getProducts } from "./logic/api/product.api";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import ProductsPage from "./pages/productsPage/ProductsPage";

import HomePage from "./pages/home/homePage";
import CartPage from "./pages/cart/cartPage";
import AboutPage from "./pages/about/aboutPage";
import ContactUsPage from "./pages/contactUs/contactUsPage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signUp/signUpPage";
import UserProfilePage from "./pages/profile/UserProfilePage";

import { Route, Routes } from "react-router";
import { UserProvider } from "./context/UserContext";
// import RegisterComps from "./components/register/RegisterComps";
import RegisterPage from "./pages/register/RegisterPage";
        
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
    <>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/signUp" element={<RegisterPage />}></Route>
        <Route path="/signIn" element={<LoginPage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contactUs" element={<ContactUsPage />}></Route>
        <Route path="/profile" element={<UserProfilePage/>}></Route>
      </Routes>
      <Footer />
    </UserProvider>
    </>
  );
}

export default App;
