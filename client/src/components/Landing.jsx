import React, { Component } from 'react'
import Message from './Message';

class Landing extends Component{
  render(props){
    return(
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center"> REMINDERS</h1>
            <Message props={props}>  </Message>

          </div>
        </div>

      </div>
    )
  }
}

export default Landing;