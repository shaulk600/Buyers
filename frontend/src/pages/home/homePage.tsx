import { Link } from "react-router";


export default function HomePage() {
  return (
    <div className="page home-page">
      <h1 className="page-title">Welcome to Purchasing Groups</h1>
      <p className="page-subtitle">
        Join forces, save money, and shop smarter together.  
        Create or join purchasing groups, track your orders, and enjoy the power of community buying.
      </p>

      <div className="page-section">
        <h2>Why join us?</h2>
        <ul className="benefits-list">
          <li>✔️ Better prices through group purchases</li>
          <li>✔️ Easy management of orders</li>
          <li>✔️ Stay connected with your groups</li>
        </ul>
      </div>

      <div className="page-actions">
        <Link to="/products" className="btn-main">       
          View Products
        </Link>
      </div>
    </div>
  );
}

