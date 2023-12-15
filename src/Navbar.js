import React from 'react';
import './Navbar.css';

import {Link, useNavigate } from 'react-router-dom';
import cmalogo from "./Cma.png"

function Navbar() {
 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Login');
  };


  return (
    <>
      <nav className="navbar">
        <div className="logo">
        <img 
          src={cmalogo}  className="png" style={{ width: '172px', height: '64px' }} />

        </div>
        <div className="search-bar">
          <input className='s1' type="text" placeholder="Search for news" />
          <button className='b1' type="submit">Search</button>
        </div>
        <div className="nav-links">
        <Link to="/">Home</Link> 
          <Link to="/news">News</Link>
          <Link to="/concern">Concern</Link>
          
          <button  onClick={handleLoginClick}>Login/signup</button>
         
        </div>
      </nav>
    </>
  );
}

export default Navbar;
