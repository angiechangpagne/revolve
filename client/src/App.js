import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI(){
    fetch('http://localhost:9000/testAPI')
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
        <Route exact path="/" component={Landing} />
        
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />
        </div>
      </div>
      </Router>  
    );
  }
}

export default App;
