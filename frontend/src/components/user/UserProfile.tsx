import { useEffect } from "react";
import { useNavigate } from "react-router";
import { type UserFull, useUser } from "../../context/UserContext";
import { getToken, ubdateToken } from "../../logic/cookies/Token";

export default function UserProfile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  if (!user) return <p>Loading user data...</p>;

  const handleLogout = () => {
    localStorage.removeItem("BuyersAccessToken");
    setUser(null);
    ubdateToken({ token: "false" }, "BuyersUser");
    navigate('/login');
  };

  useEffect(() => {
    try {
      const raw = getToken("BuyersUser");
      if (raw) {
        const parsed: UserFull = JSON.parse(raw);
        if (parsed && parsed._id) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error("Failed parsing BuyersUser:", err);
    }
  }, [setUser]);

  return (
    <div className="continer">
      <div className="page">

      <h1>My Profile</h1>

      <section>
        <h2>Personal Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone_number}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </section>

      <section>
        <h2>My Groups</h2>
        {user.groups?.length > 0 ? (
          <ul>{user.groups.map((g) => <li key={g.id}>{g.name}</li>)}</ul>
        ) : <p>No groups yet</p>}
      </section>

      <section>
        <h2>My Orders</h2>
        {user.orders?.length > 0 ? (
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.productName}</td>
                  <td>{o.date}</td>
                  <td>{o.status}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No orders yet</p>}
      </section>

      <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
}