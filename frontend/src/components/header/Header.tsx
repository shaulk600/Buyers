import { Link } from "react-router";
import './Header.css';

export default function Header() {
  return (
    <header id="HeaderComps">
      <Link to="/home">
        <img id="logo-img" src="/logo-buyers-typographic.svg" alt="logo-buyers" />
      </Link>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/signUp">Sign Up</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
