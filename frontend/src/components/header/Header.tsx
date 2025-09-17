import { Link } from "react-router";
import './Header.css';
import { UserContext } from '../../context/UserContext'
import { useContext } from "react";

export default function Header() {
  const user = useContext(UserContext);

  return (
    <header id="HeaderComps">
      <Link to="/home">
        <img id="logo-img" src="/logo-buyers-typographic.svg" alt="logo-buyers" />
      </Link>
      <nav>
        <Link to="/home" className="link">Home</Link>
        <Link to="/products" className="link">Products</Link>
      </nav>
        {
          user?.user ? (
            <Link to="/profile">
            <img id="profile-img" src="/profile.svg" alt="logo-buyers" />
            Profile
            </Link>
          ) : (
            <span className="btn">
            <Link to="/signIn"><button className="btn-green">Sign In</button></Link>
            <Link to="/signUp"><button className="btn-green">Sign Up</button></Link>
            </span>
          )
        }
    </header>
  );
}
