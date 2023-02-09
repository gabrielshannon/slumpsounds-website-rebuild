import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import slumpLogo from '../assets/slumplogo.svg';
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light slump-navbar">
      <img className="loading-img" src={slumpLogo}></img>{' '}
      <div class="navbar-menu">
        <NavLink to={`/`} className="nav-slump-item" activeClassName="active" exact={true}>
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
          to={`/media`}
          className="nav-slump-item"
          activeClassName="active"
        >
          Video
        </NavLink>
        <NavLink
          to={`/archive`}
          className="nav-slump-item"
          activeClassName="active"
        >
          Archive
        </NavLink>
        <NavLink
          to={`/info`}
          className="nav-slump-item"
          activeClassName="active"
        >
          Info
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
