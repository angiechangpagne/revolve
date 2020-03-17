import React, { Component } from 'react';

class Message extends Component{
  constructor(){
    super();


  }



  render(){
    return (
      <div class="container">
        <h2> Send SMS Message</h2>
        <input type="tel" name="number" id="number" placeholder="Enter Phone Number..." />
        <input type="text" name="msg" id="msg" placeholder="Enter Text Message..."/>
        <select name="schedule" id="schedule">
          <option value="0"> Schedule a time to send a message </option>
          <option value="1"> After 1 minutes</option>
          <option value="3"> After 3 minutes</option>
          <option value="5"> After 5 minutes</option>
        </select>
        <input type="button" id="button" value="Send Text" class="button button-primary"/>
        <p class="response"></p>
      </div>
    )
  }
}


export default Message;