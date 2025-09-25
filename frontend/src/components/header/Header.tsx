import { Link } from "react-router";
import './Header.css';
import { useUser , UserContext} from '../../context/UserContext';
import { useEffect,useContext } from "react";
// import { getToken } from "../../logic/cookies/Token";

export default function Header() {
  const user = useContext(UserContext);
  console.log(user);

  // const { user, setUser } = useUser();

  // useEffect(() => {
  //   try {
  //     const raw = getToken("BuyersUser");
  //     if (raw) {
  //       const parsed = JSON.parse(raw);
  //       if (parsed && parsed._id) {
  //         setUser(parsed);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Failed parsing BuyersUser:", err);
  //   }
  // }, [setUser]);
  return (
    <header id="HeaderComps">
      <Link to="/">
        <img id="logo-img" src="/logo-buyers-typographic.svg" alt="logo-buyers" />
      </Link>
      <nav>
        <Link to="/" className="link">Home</Link>
        <Link to="/products" className="link">Products</Link>
      </nav>
      {user?.user ? (
        <Link to="/profile" className="profile-link">
          <img id="profile-img" src="/profile.svg" alt="profile" />
          Profile
        </Link>
      ) : (
        <span className="btn">
          <Link to="/signIn"><button className="btn-green">Sign In</button></Link>
          <Link to="/signUp"><button className="btn-green">Sign Up</button></Link>
        </span>
      )}
    </header>
  );
}