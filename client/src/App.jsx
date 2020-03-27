import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { HashRouter, Route, Switch, withRouter, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
// import Navbar from './components/NavBar/NavBar';
// import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
import Landing from './Pages/Landing/Landing';
import User from './Pages/User/User';
// import About from './Pages/About/About';
// import LoginForm from './components/LoginForm/LoginForm';
// import Register from './components/Register';
// import Profile from './components/Profile/Profile'; 
import './App.css';
// import store from './store';
import { withCookies, Cookies } from 'react-cookie';

//props is inherited from universal cookie provider, 
//to do: add express universal cookies for server side render

//todo: redux store <Provider> 
//cookies is globall hoisted on the wrapper
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
    this.handleUserChange=this.handleUserChange.bind(this);
  }
  handleUserChange(user){
    const { cookies } = this.props;
    cookies.set('user', user, { path: '/'}); //go back to login upon logout
    this.setState({ user });
  };


  // callAPI(){
  //   fetch('http://localhost:3001/testAPI')
  //     .then(res => res.next())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }

  componentDidMount(){
    // let history=useHistory;
    let initialStore={

    };
    // const store = createStore(rootReducer,initialStore);
    // this.setState({
    //   history: history
    // })
    // this.callAPI();
  }

  render(){
    const { user } =this.state;
    return (
      <React.Fragment>
      {
      <HashRouter>
      <div className="App">

        {/* <Navbar /> */}
      {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <div className="container">
        <Switch>
        <Route exact path="/" component={Landing}/> 
        
        {/* <Route exact path='/register' component={Register} /> */}
        <Route exact path="/user" component={User} />
        {/* <Route exact path='/about' component={About} /> */}
        {/* <Route exact path='/login' component={LoginForm} /> */}
        {/* <Route exact path='/profile' component={Profile} /> */}
        </Switch>
        </div>
      </div>
  
      </HashRouter>  
      }
      </React.Fragment>
    )
  }
}
//withCookies(withRouter(App)))
export default withCookies(App);
