import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer>
        <Link to="/about"><button className='btn-green'>About</button></Link>
        <p>Create by grop 1</p>
        <Link to="/contactUs"><button className='btn-green'>Contact us</button></Link>
    </footer>
  )
}
