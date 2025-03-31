import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/cart">Cart</Link> 
    </nav>
  );
};

export default Navbar;
