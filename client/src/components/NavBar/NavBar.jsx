import React , { Component } from "react";
import { Link } from "react-router-dom";
import Cookies2 from "js-cookie";
import "./NavBar.css";

//make functional component
const NavBar= () => {

  const handleSignOut = () => {
    //delete user cookie upon sign out
    Cookies2.remove('user');
    // window.location.href="/";
  }

    return (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li className={window.location.pathname==="/user" ? "active" : "" }>
            <Link className="navbar-title animated headShade" to="/user"> Home</Link>
          </li>
          <li className={window.location.pathname === "/" ? "active" : ""}>
            <Link className="navbar-title animated headShake" to="/" onClick={handleSignOut}> Sign Out</Link>
          </li>
        </ul>
      </nav>
    )
}

export default NavBar;