import { Link } from "react-router";
import './Header.css';
import { UserContext } from '../../context/UserContext'
import { useContext, useEffect, useState } from "react";
import { getToken } from "../../logic/cookies/Token";

export default function Header() {
  const user = useContext(UserContext); //שישאר בשביל orders -אין לו גישה לא ל user ולא ל setUser
  const [userLocalStorage, setUserLocalStorage] = useState("")
  useEffect(() => {
    setUserLocalStorage(getToken("BuyersUser"));
  }, [])

  // useEffect(() => {
  //   const data = JSON.parse(getToken("BuyersUser") || "{}");
  //   if (data['_id']) {
  //     setUserLocalStorage(data);
  //     user?.setUser(data);
  //   }

  // }, []);

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
        userLocalStorage || user?.user? (
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
