import React from 'react';
import './Reminder.css';
import moment from 'moment-timezone';
import UpdateForm from '../UpdateForm/UpdateForm';
// import { cookies } from 'react-cookie';
//delete, view one, update/edit, will update and reset on cookies from database
//{ rmdr, handleUpdate, handleDelete, handleRenderMap, }
//no this in functional anonymous functional context
//pass props from reminders well
const Reminder = (props) => {
  const pseudoState = {
    isUpdateModalOpen:"",
  }
  //to do//wrapp modal around and morph to conditional form of regex with respect to isUpdateModalOpenState

  console.log('reminder component props passed ',props);
    return (
      <div className="panel-body">
      <p></p>
        <h5> Reminder Name: {props.rmdr.reminderName}</h5>
        <h5> Notification Phone Number: {`(${props.rmdr.reminderNumber.split('').slice(0,3).join('')}) ${props.rmdr.reminderNumber.split('').slice(3,6).join('')}-${props.rmdr.reminderNumber.split('').slice(6).join('')}`} </h5>
        <h5> Date/Time: {moment.tz(props.rmdr.time, props.rmdr.timezone).format('MMMM Do YYYY, h:mm A')}</h5>
        <h5> Notification: {`${props.rmdr.notificationLabel} before` } </h5> 
        {props.handleUpdate && 
        <button className="btn btn-default" onClick={() => { pseudoState.isUpdateModalOpen= true} }> Update </button>
        } &nbsp;
        {props.handleDelete && 
        <button className="btn btn-default" onClick={() => props.handleDelete(props.rmdr)}> Delete</button>
        }
        <UpdateForm isModalOpen={pseudoState.isUpdateModalOpen} rmdr={props.rmdr} handleUpdate={props.handleUpdate} />
      </div>
  );

}

export default Reminder;