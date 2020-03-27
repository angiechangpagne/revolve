import React from 'react';
import './Reminder.css';
import moment from 'moment-timezone';
// import { cookies } from 'react-cookie';
//delete, view one, update/edit, will update and reset on cookies from database
//{ rmdr, handleUpdate, handleDelete, handleRenderMap, }
//no this in functional anonymous functional context
//pass props from reminders well
const Reminder = (props) => {
  console.log('reminder component props passed ',props);
    return (
      <div className="panel-body panel-body-upcoming-rmdrs">
      <p></p>
        <h5> Reminder Name: {props.rmdr.reminderName}</h5>
        <h5> Notification Phone Number: {`(${props.rmdr.reminderNumber.split('').slice(0,3).join('')}) ${props.rmdr.reminderNumber.split('').slice(3,6).join('')}-${props.rmdr.reminderNumber.split('').slice(6).join('')}`} </h5>
        <h5> Date/Time: {moment.tz(props.rmdr.time, props.rmdr.timezone).format('MMMM Do YYYY, h:mm A')}</h5>
        <h5> Notification: {`${props.rmdr.notificationLabel} before` } </h5> 
        {props.handleUpdate && 
        <button className="btn btn-default" onClick={() => props.handleUpdate(props.rmdr)}> Update </button>
        } &nbsp;
        {props.handleDelete && 
        <button className="btn btn-default" onClick={() => props.handleDelete(props.rmdr)}> Delete</button>
        }
      </div>
  );

}

export default Reminder;