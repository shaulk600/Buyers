import { Link } from 'react-router'

export default function FooterComps() {
  return (
    <div>
      <nav>
        <Link to="/page/about">About</Link>
        <Link to="/page/ContactUs">Contact us</Link>
      </nav>
    </div>
  )
}
