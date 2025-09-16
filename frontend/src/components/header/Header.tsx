import { Link } from "react-router";

export default function Header() {
  return (
    <header id="HeaderComps">
      <div id="logo">
        <img src="/logo-buyers-typographic.svg" alt="our logo" />
      </div>
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
