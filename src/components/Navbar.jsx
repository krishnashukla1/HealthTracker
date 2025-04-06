import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo" style={{ color: 'red' }}>Health Tracker</h2>
      <ul className="navbar-links">
        <li><Link to="/">TrackerApp</Link></li>
        <li><Link to="/list">TrackerList</Link></li>
        <li><Link to="/card">TrackerCard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
