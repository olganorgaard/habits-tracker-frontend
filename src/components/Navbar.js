import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import '../styles/navbar.css';


const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);


  return (
     <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🌿 YourHabits</Link>
      </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
      <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
      
      <div className="auth-buttons">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
      </div>
      <div className="mobile-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
