/* eslint-disable import/first */
import React, { Component } from 'react';
// import { instanceOf } from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useHistory } from 'react-router';
// import Navbar from './components/NavBar/NavBar';
// import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory();
import Landing from './Pages/Landing/Landing';
import User from './Pages/User/User';
// import About from './Pages/About/About';
// import LoginForm from './components/LoginForm/LoginForm';
// import Register from './components/Register';
// import Profile from './components/Profile/Profile'; 
import './App.css';
// import store from './store';
// import Cookies2 from 'js-cookie';

//props is inherited from universal cookie provider, 
//to do: add express universal cookies for server side render

//todo: redux store <Provider> 
//cookies is globall hoisted on the wrapper
//   {/* <Route exact path='/about' component={About} /> */}
//   {/* <Route exact path='/login' component={LoginForm} /> */}
//   {/* <Route exact path='/profile' component={Profile} /> */}
//   {/* <Route exact path='/register' component={Register} /> */}
//           {/* <Navbar /> */}
// {/* <p className="App-intro">{this.state.apiResponse}</p> */}
// var Cookies2 = Cookies.noConflict()

class App extends Component {
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
//  componentDidMount(){
//   Cookies2.set('user', this.state.userCookie, { path: '/'}); //go back to login upon logout
//  }
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

  render(){
    return (
      <Router>
      <div className="App">
        <div className="container">
        <Switch>
        <Route exact path="/" render={()=> <Landing /> } /> 
        <Route exact path="/user" render={()=> <User />} />
        </Switch>
        </div>
      </div>
      </Router> 
    );
  }
}
//withCookies(withRouter(App)))
export default App;
