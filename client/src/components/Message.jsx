import React, { Component } from 'react';
import { message } from './UserFunctions'
class Message extends Component{
  constructor(props){
    super();
    this.state={
      number: '',
      message: '',
      scheduleSelect: '',
      response: {}
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    const newMessage= {
      number: this.state.number,
      message: this.state.message,
      scheduleSelect: this.state.scheduleSelect,
      
    }

    message(newMessage).then(res => {
      this.props.history.push('/profile')
    })
  }

  render(){
    return (
      <div className="container">
        <h2> Send SMS Message</h2>
        <input type="tel" className="number" name="number" id="number" placeholder="Enter Phone Number..." onChange={this.onChange}
/>
        <input type="text" className="msg" name="message" id="msg" onChange={this.onChange}
 placeholder="Enter Text Message..."/>
        <select className="schedule" id="schedule" name="scheduleSelect" onChange={this.onChange}>
          <option value="0"> Schedule a time to send a message </option>
          <option value="1"> After 1 minutes</option>
          <option value="3"> After 3 minutes</option>
          <option value="5"> After 5 minutes</option>
        </select>
        <button id="button" value="Send Text" className="button button-primary" onSubmit={this.onSubmit}>Send Reminder</button>
        <p className="response" name="response" id="response"></p>
      </div>
    )
  }
}


export default Message;