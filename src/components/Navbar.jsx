import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import slumpLogo from '../assets/slumplogo.svg';
const Navbar = () => {
  return (
    <div class="navbar-container">


    <nav class="slump-navbar">
      <img className="nav-logo-img" src={slumpLogo}></img>{' '}
      <div class="navbar-menu">
        <NavLink
          to={`/`}
          className="nav-slump-item"
          activeClassName="active"
          exact={true}
        >
          Home
        </NavLink>
        <NavLink
          to={`/releases`}
          className="nav-slump-item"
          activeClassName="active"
        >
          Releases
        </NavLink>
  
        <NavLink
          to={`/info`}
          className="nav-slump-item"
          activeClassName="active"
        >
          Info / Contact
        </NavLink>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
