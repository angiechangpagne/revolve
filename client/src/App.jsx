import React, { Component } from 'react';
import { HashRouter, Route, Switch, withRouter, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
// import Navbar from './components/NavBar/NavBar';
import { createBrowserHistory } from 'history';
import Landing from './Pages/Landing/Landing';
import User from './Pages/User/User';
// import About from './Pages/About/About';
// import LoginForm from './components/LoginForm/LoginForm';
// import Register from './components/Register';
// import Profile from './components/Profile/Profile'; 
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { history: ""};
  }

  // callAPI(){
  //   fetch('http://localhost:3001/testAPI')
  //     .then(res => res.next())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }

  componentDidMount(){
    let history={useHistory};
    this.setState({
      history: history
    })
    // this.callAPI();
  }

  render(){
    
    return (
      <React.Fragment>
      {
      <HashRouter>
      <div className="App">

        {/* <Navbar /> */}
      {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <div className="container">
        <Switch>
        <Route exact path="/" component={Landing} > history={this.state.history} </Route>
        
        {/* <Route exact path='/register' component={Register} /> */}
        <Route exact path='/user' component={User} > history={this.state.history}</Route>
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

export default withRouter(App);
