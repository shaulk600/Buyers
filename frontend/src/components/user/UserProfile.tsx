// src/components/user/UserProfile.tsx

import { useUser } from "../../context/UserContext";

export default function UserProfile() {
  const { user } = useUser();

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
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
        {user.groups.length > 0 ? (
          <ul>{user.groups.map((g) => <li key={g.id}>{g.name}</li>)}</ul>
        ) : <p>No groups yet</p>}
      </section>

      <section>
        <h2>My Orders</h2>
        {user.orders.length > 0 ? (
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
                  <td>{o.total}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No orders yet</p>}
      </section>
    </div>
  );
}
