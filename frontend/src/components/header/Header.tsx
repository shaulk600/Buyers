import { Link } from "react-router";
import './Header.css';

export default function Header() {
  return (
    <header id="HeaderComps">
      <Link to="/page/home" id="logo">
        <img id="logo-img" src="/logo-buyers-typographic.svg" alt="logo-buyers" />
      </Link>
      <nav>
        <Link to="/page/home">Home</Link>
        <Link to="/page/products">Products</Link>
        <Link to="/page/signIn">Sign In</Link>
        <Link to="/page/signUp">Sign Up</Link>
        <Link to="/page/cart">Cart</Link>
      </nav>
    </header>
  );
}
