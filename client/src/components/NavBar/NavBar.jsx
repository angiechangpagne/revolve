import React , { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./NavBar.css";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout, isAuth }  from '../../actions/authActions';
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

  console.log('navbar user authState.user', props.authState.user);
    return (
      <span>
      <nav className="navbar navbar-default">
      { props.authState.isAuthenticated &&
      <h1> Welcome {props.authState.user.firstName} </h1>
      }
        <ul className="nav navbar-nav">
          <li className={window.location.pathname==="/user" ? "active" : "" }>
            <Link className="navbar-title animated headShake" to="/user"> Home</Link>
          </li>
          <li className={window.location.pathname === "/" ? "active" : ""}>
            <Link className="navbar-title animated headShake" to="/" onClick={handleSignOut}> Sign Out</Link>
          </li>
        </ul>
      </nav>
      </span>
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
//map dispatch only for actions done in current component
export default connect(mapStateToProps, { signout, buttonReset })(NavBar);