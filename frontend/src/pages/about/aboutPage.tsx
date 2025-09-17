

export default function AboutPage() {
  return (
    <div className="page about-page">
      <h1 className="page-title">About Purchasing Groups</h1>
      <p className="page-text">
        Purchasing Groups is a platform that helps people save money by buying
        together. Instead of shopping individually, users can create or join
        groups, combine their orders, and enjoy significant discounts.
      </p>

      <div className="page-section">
        <h2>Our Mission</h2>
        <p>
          We believe in the power of community. By connecting people with similar
          needs, we make shopping smarter, more affordable, and more fun.
        </p>
      </div>

      <div className="page-section">
        <h2>How It Works</h2>
        <ul className="steps-list">
          <li>🔹 Sign up and create your profile</li>
          <li>🔹 Join an existing purchasing group or start a new one</li>
          <li>🔹 Place orders together with others</li>
          <li>🔹 Save money thanks to bulk discounts</li>
        </ul>
      </div>
    </div>
  );
}

