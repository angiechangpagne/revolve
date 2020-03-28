import React , { Component } from "react";
import { Link } from "react-router-dom";
// import Cookies2 from "js-cookie";
import "./NavBar.css";
import { withCookies, Cookies } from 'react-cookie';
//make functional component
const NavBar= () => {

  const handleSignOut = (props) => {
    //delete user cookie upon sign out
    console.log('Cookies', Cookies);
    // Cookies.remove('user');
    props.userCookie.handleUserDelete();
    window.location.href="/";
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

export default withCookies(NavBar);