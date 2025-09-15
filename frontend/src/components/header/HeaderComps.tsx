import { Link } from "react-router";

export default function HeaderComps() {
  return (
    <div id="HeaderComps">
      <div id="logo">
        <img src="frontend\public\logo-buyers.svg" alt="our logo" />
      </div>
      <nav>
        <Link to="/page/home.tsx">Home</Link>
        <Link to="/page/products.tsx">Products</Link>
        <Link to="/page/signIn.tsx">Sign In</Link>
        <Link to="/page/signUp.tsx">Sign Up</Link>
        <Link to="/page/cart.tsx">Cart</Link>
      </nav>
    </div>
  );
}
