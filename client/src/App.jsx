/* eslint-disable import/first */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Link } from 'react-router-redux';
// import Navbar from './components/NavBar/NavBar';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './Pages/Landing/Landing';
import User from './Pages/User/User';
import { isAuth } from './actions/authActions';
import { buttonClicked } from './actions/uiActions';
// import About from './Pages/About/About';
// import LoginForm from './components/LoginForm/LoginForm';
// import Register from './components/Register';
// import Profile from './components/Profile/Profile'; 
import './App.css';
import { render } from 'enzyme';
// import Cookies2 from 'js-cookie';

//props is inherited from universal cookie provider, 
//to do: add express universal cookies for server side render

//cookies is globall hoisted on the wrapper
//   {/* <Route exact path='/about' component={About} /> */}
//   {/* <Route exact path='/login' component={LoginForm} /> */}
//   {/* <Route exact path='/profile' component={Profile} /> */}
//   {/* <Route exact path='/register' component={Register} /> */}
//           {/* <Navbar /> */}
// {/* <p className="App-intro">{this.state.apiResponse}</p> */}
// var Cookies2 = Cookies.noConflict()

// const history = syncHistoryWithStore(history, store);

export class App extends Component{
  static propTypes = {
    button: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };
  // static propTypes = {
  //   userCookie: instanceOf(Object).isRequired
  // };
  // constructor(props){
  //   super(props);
  //   //in this context
  //   // console.log('this context', this);
  //   // this.state={
  //   //   cookies: "",
  //   //   userCookie: ""
  //   // }
  // }
  // componentWillMount(){
  //   // const Cookies2=new Cookies();
  //   // this.setState({
  //   //   cookies: Cookies2
  //   // })
  // }
 componentDidMount(){
   store.dispatch(isAuth());
  // Cookies2.set('user', this.state.userCookie, { path: '/'}); //go back to login upon logout
 }
  // onChange(userState){
  //   // const { cookies } = this.props;
  //   // this.handleUserDelete();
  //   console.log('onChange in Root app', userState);
  //   Cookies2.set('user',  userState ); //go back to login upon logout
  //   this.setState({ userCookie: Cookies2.get('user') });
  // };

  // handleUserDelete(){
  //   Cookies2.remove('user');
  // }

  // callAPI(){
  //   fetch('http://localhost:3001/testAPI')
  //     .then(res => res.next())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }
  // componentDidMount(){
  //   // let history=useHistory;
  //   let initialStore={
    //};
    // const store = createStore(rootReducer,initialStore);
    // this.setState({
    //   history: history
    // })
    // this.callAPI();
  //}
  //render passed will automatically set the user think of it as the superclass render then the subclass render
  render() {
    return (
     <React.Fragment>
     <div className="App">
      <Router>
        <div className="container">
        <Switch>
        <Route exact path="/" component={<Landing/> } /> 
        <Route exact path="/user" component={<User/>} />
        </Switch>
        </div>
      </Router>
      </div>
      </React.Fragment>
      );
  }  
}
const mapStateToProps = (state) => ({
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(App);
