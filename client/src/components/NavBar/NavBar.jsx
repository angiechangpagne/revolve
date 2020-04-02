import React , { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./NavBar.css";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout}  from '../../actions/authActions';
import { buttonReset } from '../../actions/uiActions';
//make functional component
const NavBar= (props) => {

  const handleSignOut = (event) => {
    //delete user cookie upon sign out
    event.preventDefault();
    props.buttonReset();
    props.signout();
    // console.log('Cookies', Cookies);
    // Cookies.remove('user');
    // props.userCookie.handleUserDelete();
    // window.location.href="/"; //better to use history push within the Redirect component
  };
  if(!props.authState.isAuthenticated){
    return <Redirect to ="/"/> 
  }
    return (
      <nav className="navbar navbar-default">
      <h1> { props.authState ? `Welcome, ${props.authState.user.firstname}` : '' }</h1>
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
NavBar.propTypes = {
  button: PropTypes.bool,
  authState: PropTypes.object.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //map state to redux store as props
  authState: state.auth,
  button: state.ui.button
});

export default connect(mapStateToProps, { signout, buttonReset })(NavBar);