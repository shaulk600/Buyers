import { Link } from 'react-router'

export default function Footer() {
  return (
    <div>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/contactUs">Contact us</Link>
      </nav>
    </div>
  )
}
