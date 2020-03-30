import React, { Component} from 'react';
import './LoginForm.css';
import api from '../../Utils/api';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { buttonClicked, isLoading } from '../actions/authActions';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

//global hoisted hooks/ injected context
// import { this.props.cookies} from 'universal-cookie';
// const Universalthis.props.cookies=new this.props.cookies();
//'js-cookie';
class LoginForm extends Component {
  static propTypes = {
    isAuthenticated: Proptyles.bool,
    status: PropTypes.object.isRequired,
    buttonClicked: PropTypes.func.isRequired,
    loading: PropTypes.bool

  }
  constructor(props){
    super(props);
    this.state = {
      //state is for existing user login input element values
      loginEmail : props ? props.loginEmail : "",
      loginPassword : props ? props.loginPassword : "",
      //state to aid validate existing user login
      isLoginEmailEmpty: false,
      isLoginPasswordEmpty: false,
      isValidEmail: true, 
      isValidPassword: true,
      //state for new user input values
      signUpFirstName : "",
      signUpLastName : "",
      signUpEmail : "",
      signUpPassword: "",
      signUpPhone: "",
      emailValidation: "",
      message: "",
      //states to aid validating new user input values
      isSignUpFirstNameEmpty: false,
      isSignUpLastNameEmpty: false,
      isSignUpEmailEmpty: false,
      isSignUpPasswordEmpty: false, 
      isSignUpPhoneEmpty: false,
      isEmailUnique: true, 
      isEmailValid: true,
      //open/close the state for the modal
      isModalOpen: false,
      //state for user cookie
      userCookie: "",
      user:""
    };

    this.handleInputChange=this.handleInputChange.bind(this);
    this.openModal=this.openModal.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.handleLoginFormSubmit=this.handleLoginFormSubmit.bind(this);
    this.handleSignupFormSubmit=this.handleSignupFormSubmit.bind(this);
  }
        
  emailValidate(email) {
    //if email doesn't exist, let it pass through
    //else, check if email is valid
    return (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
  }

  componentWillMount() {
    this.setState({ userCookie : Cookies.get('user') });
  }

  componentDidMount() {
    console.log('this.props in Login Form', this.props);
    // console.log('Cookies', Cookies);
    if(this.state.userCookie){
      window.location.href = "/user"; 
      // this.props.history.push('/');
      }
  }

  componentDidUpdate(prevProps) {
    const status= this.props.status;
    if(status !==prevProps.status && status.id === 'LOGIN_FAIL'){
      this.setState({ messsage: status.statusMsg });
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  handleInputChange = (event) => {
    //update state for ever key stroke inside input elements
    const { name, value } = event.target;
    this.setState({
      [name] : value.trim()
    });
  };

  handleLoginFormSubmit = (event) => {
    //prevent page from auto refreshing on default
    event.preventDefault();
    const newState = {};

    //assign input value and validation states in array of obj
    const loginUserStates = [
      { input : this.state.loginEmail, validation : "isLoginEmailEmpty" },
      { input : this.state.loginPassword, validation : "isLoginPasswordEmpty" }
    ];

    loginUserStates.forEach(({input, validation}) => {
      const inputExist = !!input;
      //truthy of value
      console.log('inputExist', inputExist);
      newState[validation] = !inputExist;
    });

    this.setState(newState);

    //if all client-side input validation pass
    if(this.state.loginEmail && this.state.loginPassword){
      //send request to server for provided user login creds
      api.getUser({ 
        email : this.state.loginEmail,
        password : this.state.loginPassword
      })
      .then(res => {
        console.log('res',res);
        console.log('res.data',res.data);
        console.log('res.data.userInfo',res.data.userInfo);
        thisprops.isLoading(); //we want to load before we check redux map dispatch actions to authenticate to reduce lag
        //if email and password are valid check res, res.data or res.userInfo
        if(res.data.isValidEmail && res.data.isValidPassword){
          //a GET request for "/home"
          // api.getUserReminders(res.data.id);
          Cookies.set('user', res.data.userInfo);
          // Cookies.set('reminders', res.data.userInfo.reminders, { path: '/user'});
          // this.setState({ reminders: res.data.userInfo.reminders });
          // this.setState({ user: res.data.userInfo }); //takes time for state to update
          window.location.href="/user";
          //store response from database then wait for set, then redirect
        }
        //else if email provided isn't in the db
        else if (!res.data.isValidEmail) {
          //update state
          this.setState({
            isValidEmail: false
          });
        }
        //if password provided doesn't match what's in the db
        else if(!res.data.isValidPassword){
          //update state
          this.setState({
            isValidPassword: false
          });
        }
      })
      .catch(err => console.log(err));
    }
  };

  handleSignupFormSubmit = (event) => {
    //prevent page form refreshing by default
    event.preventDefault();
    console.log("I clicked the save new user butten");
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpPhone,
      isEmailUnique
    } = this.state;

    //assign input value and validation states in array of objects
    const createNewUserStates = [
      { input : signUpFirstName, validation : "isSignUpfirstNameEmpty"},
      { input : signUpLastName, validation : "isSignUpLastNameEmpty"},
      { input : signUpEmail, validation: "isSignUpEmailEmpty"},
      { input : signUpPassword, validation: "isSignUpPasswordEmpty"},
      { input : signUpPhone, validation : "isSignUpPhoneEmpty"}
    ];

    this.setState({ isEmailValid: !signUpEmail || this.emailValidate(signUpEmail) });

    //if any of the input values are empty
    if(!signUpFirstName || !signUpLastName || !signUpEmail || !signUpPassword || !signUpPhone)
    {
      //set validation states to their approprate values
      createNewUserStates.forEach(stateElement => {
        const inputExist = !!stateElement.input;
        console.log('if input exists in create', inputExist);
        this.setState({ [stateElement.validation]: !inputExist });
      });
    }
    //else if all input values are not empty
    else if (signUpFirstName && signUpLastName && signUpEmail && signUpPassword && signUpPhone && isEmailUnique)
    {
      api.saveUser({
        firstName : signUpFirstName,
        lastName : signUpLastName, 
        email : signUpEmail, 
        password : signUpPassword, 
        mobileNumber : signUpPhone
      })
      .then(res => {
        console.log('res on line 170 of Login Form is', res) //promise chain response from server request
        if(res.data.isEmailUnique){
          this.setState({ isEmailUnique: res.data.isEmailUnique });
          this.closeModal();
        } else {
          this.setState({ isEmailUnique: false });
          console.log('email already in use');
        }
      })
      .catch(err => console.log(err));
    }
  };

  render() {
    console.log('state before render', this.state);
    return (
      <div className="container">
      <Modal 
        id="modal" 
        className="animated pulse"
        isOpen={this.state.isModalOpen}>
        <form id="form" method="POST" className="topBefore animated headShake">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.closeModal}>&times;</button>
            <h4 id="SignUpForm" className="modal-title">Sign Up Form</h4>
          </div>
          <input id="name" type="text" placeholder="firstname" value={this.state.signUpFirstName} name="signUpFirstName" onChange={this.handleInputChange}  className="loginHover"></input>
              {this.state.isSignUpFirstNameEmpty &&
                <div id="error-first-name-left-empty" className={!this.state.isSignUpFirstNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please provide your first name!</p>
                </div>
              }
          <input id="name" type="text" placeholder="lastname" value={this.state.signUpLastName} name="signUpLastName" onChange={this.handleInputChange}  className="loginHover"></input>
                {this.state.isSignUpLastNameEmpty &&
                <div id="error-last-name-left-empty" className={!this.state.isSignUpLastNameEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please provide your last name!</p>
                </div>
              }
          <input id="name" type="email" placeholder="email" value={this.state.signUpEmail} name="signUpEmail" onChange={this.handleInputChange}  className="loginHover"></input>
              {this.state.isSignUpEmailEmpty &&
                <div id="error-email-left-empty" className="error-div-signup">
                  <p className="error text-center">Please provide your email!</p>
                </div>
              }
              {!this.state.isEmailUnique &&
                <div id="error-password-incorrect" className="error-div-signup">
                  <p className="error text-center">The email provided was already used! Please enter a different email address.</p>
                </div>
              }
              {!this.state.isEmailValid &&
                <div id="error-password-incorrect" className="error-div-signup">
                  <p className="error text-center">Email is not valid!</p>
                </div>
              }
          <input id="name" type="password" placeholder="password" value={this.state.signUpPassword} name="signUpPassword" onChange={this.handleInputChange}  className="loginHover"></input>
              {this.state.isSignUpPasswordEmpty &&
                <div id="error-password-left-empty" className={!this.state.isSignUpPasswordEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please provide your password!</p>
                </div>
              }
          <input id="name" type="phonenumber" placeholder="123-456-7899" value={this.state.signUpPhone} name="signUpPhone" onChange={this.handleInputChange}  className="loginHover"></input>
              {this.state.isSignUpPhoneEmpty &&
                <div id="error-phone-left-empty" className={!this.state.isSignUpPhoneEmpty ? "error-div-signup invisible" : "error-div-signup"}>
                  <p className="error text-center">Please provide your mobile number!</p>
                </div>
              } 
          <input id="submit" type="submit" value="Submit!" className="loginHover" onClick={this.handleSignupFormSubmit}></input>
        </form>
      </Modal>
      <section className="loginSection">
      <div>
        <form id="form" className="topBefore animated headShake"> 
        <div id="login-title"><span> <header className="animated headShake">Log In</header></span></div>
          <input id="name" type="email" placeholder="email" value={this.state.loginEmail} name="loginEmail" onChange={this.handleInputChange} type="text" id="input-email" className="loginHover"></input>
            {this.state.isLoginEmailEmpty &&
              <div id="error-email-left-empty">
                <p className="error text-center">Please enter your email address!</p>
              </div>
            }
          <input id="email" type="password" placeholder="password" value={this.state.loginPassword} name="loginPassword" onChange={this.handleInputChange} type="password" id="input-password" className="loginHover"></input>
            {this.state.isLoginPasswordEmpty &&
              <div id="error-password-left-empty">
                <p className="error text-center">Please enter your password!</p>
              </div>
            }
            {!this.state.isValidPassword &&
              <div id="error-password-incorrect">
                <p className="error text-center">The password is incorrect!</p>
              </div>
            }  
          <input id="submit" type="submit" value="Sign In!" className="loginHover" onClick={this.handleLoginFormSubmit}></input>
          {!this.state.isValidEmail &&
            <div id="error-username-not-exist">
              <p className="error text-center">Sorry! Your email or password is incorrect</p>
            </div>
          }
        <hr></hr>
        <span id="create-account"> <p id="create-acct" className="animated bounceInLeft">Need an account?</p></span>
        </form>
        <button onClick={this.openModal}>SIGN UP</button>
        </div>
      </section>
    </div>
    );
  }
}

//map to props after the render
const mapStateToProps = (state) => ({ 
  //we map the state element in redux store to props
  //element location is right, key is left
  input: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated,
  status: state.status,
  loading: state.ui.loading
});

export default connect(mapStateToProps, { login, isLoading, buttonClicked })(LoginForm);