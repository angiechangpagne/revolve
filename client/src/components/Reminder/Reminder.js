import React from 'react';
import './Reminder.css';
import moment from 'moment-timezone';

const Reminder = ({ rmdr, handleUpdate, handleDelete, handleRenderMap, }) => (
    <div className="panel-body panel-body-upcoming-rmdrs">
      <h5> Reminder Name: {rmdr.reminderName}</h5>
      <h5> Notification Phone Number: {`(${rmdr.reminderNumber.split('').slice(0,3).join('')}) ${rmdr.reminderNumber.split('').slice(3,6).join('')}-${rmdr.reminderNumber.split('').slice(6).join('')}`} </h5>
      <h5> Date/Time: {moment.tz(rmdr.time, rmdr.timezone).format('MMMM Do YYYY, h:mm A')}</h5>
      <h5> Notification: {`${rmdr.noificationLabel} before` } </h5> 
      {handleDelete && 
      <button className="btn btn-default" onClick={() => handleUpdate(rmdr)}> Update </button>
      } &nbsp;
      {handleDelete && 
      <button className="btn btn-default" onClick={() => handleDelete(rmdr)}> Delete</button>
      }
    </div>
);

export default Reminder;