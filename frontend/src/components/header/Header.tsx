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
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
        {
          user ? (
            <span className="btn">
            <Link to="/signIn"><button>Sign In</button></Link>
            <Link to="/signUp"><button>Sign Up</button></Link>
            </span>
          ) : (
            <Link to="/profile">
            <img id="profile-img" src="/profile.svg" alt="logo-buyers" />
            My Profile
            </Link>
          )
        }
    </header>
  );
}
