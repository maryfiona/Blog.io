import '../css/Navbar.css'
import blog from '../assets/blog.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={blog} alt="Blog Logo" className="logo" />
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Blog</Link>
          </li>
        
          <li className="navbar-item">
            <Link to="/Contact" className="navbar-link">Contact</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
