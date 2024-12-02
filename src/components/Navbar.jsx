import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">ContactApp</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/add" className="navbar-item">Add Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
