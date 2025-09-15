import { Link } from "react-router";

export default function HeaderComps() {
  return (
    <div id="HeaderComps">
      <div id="logo">
        <img src="logo-buyers.svg" alt="our logo" />
      </div>
      <nav>
        <Link to="/page/home">Home</Link>
        <Link to="/page/products">Products</Link>
        <Link to="/page/signIn">Sign In</Link>
        <Link to="/page/signUp">Sign Up</Link>
        <Link to="/page/cart">Cart</Link>
      </nav>
    </div>
  );
}
