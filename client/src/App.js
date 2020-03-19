import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './Pages/Landing';

import User from './Pages/User';
import LoginForm from './components/LoginForm';
// import Register from './components/Register';
import Profile from './components/Profile'; 
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI(){
    fetch('http://localhost:3001/testAPI')
      .then(res => res.next())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount(){
    this.callAPI();
  }

  render(){
    return (
      <Router>
      <div className="App">

        <Navbar />
      {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <div className="container">
        <Switch>
        <Route exact path="/" component={Landing} />
        
        {/* <Route exact path='/register' component={Register} /> */}
        <Route exact path='/user' component={User} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/profile' component={Profile} />
        </Switch>
        </div>
      </div>
      </Router>  
    );
  }
}

export default App;
