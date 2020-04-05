import React, { Component } from 'react';
import Modal from 'react-modal';
import api from '../../Utils/api';
import Reminder from '../Reminder/Reminder';
import RmdrForm from '../RmdrForm/RmdrForm';
import Cookies from 'js-cookie';
import './RemindersWell.css';
// import { connect } from 'react-redux';
//well controlls CRUD functional states, passings to functional components
import PropTypes from 'prop-types';
//props sent from user, use for get, redirect exit
//delete
// import this.props.cookies from "js-cookie";
export class RemindersWell extends Component{
  constructor(props){
    super(props);
    this.state = {
      rmdrId: '',
      rmdrName: '',
      rmdrTime: '',
      rmdrNotification: '',
      rmdrNotificationNumber: '',
      rmdrNotificationLabel: '',
      reminders: [],
      isMapModalOpen: "",
      isUpdateModalOpen:"",
      lat: '',
      lng: '',
      address: '',
      user: '',
      userCookie:''
    }
    this.handleDelete=this.handleDelete.bind(this); //bindint to this class context
    this.handleRenderMap=this.handleRenderMap.bind(this);
    this.handleUpdateReminder=this.handleUpdateReminder.bind(this);
    this.loadReminders=this.loadReminders.bind(this);
    this.getPastReminders=this.getPastReminders.bind(this);
    this.getUpcomingReminders=this.getUpcomingReminders.bind(this);
    this.openUpdateModal=this.openUpdateModal.bind(this);
  }
  
  componentWillMount() {
    const { user }= this.props; //actually a clone of the user JSON from prior redux store during current session
    console.log('reminders well', this.props.user);
    this.setState({ user: user });
    // if(!this.props.user || !this.props.user.id){
    //   console.log('log in again');
    //   // this.props.user.remove('user');
    //   console.log('this.props.user cookies', this.props.user);
    //   window.location.href="/";
    // }
    // const {
    //   user
    //   // rmdrName,
    //   // rmdrNotification,
    //   // rmdrNotificationLabel,
    //   // rmdrNotificationNumber
    // } = this.props;
    //  //set the userer cookie state
    //  this.setState({
    //   // rmdrName: rmdrName || '',
    //   // rmdrTime: new Date(),
    //   // rmdrNotification: rmdrNotification || '',
    //   // rmdrNotificationNumber: rmdrNotificationNumber || user.mobileNumber, 
    //   // rmdrNotificationLabel: rmdrNotificationLabel || '',
    //   user: user || {}
    // });
    this.loadReminders();
  }

  handleDelete = (rmdr) => {
    const { user } = this.state;
    const userId=user._id;
    const rmdrId=rmdr._id;
    api.deleteUserReminder(userId, rmdrId)
      .then((res) => {
        console.log('deleted reminder', res);
        this.loadReminders();
      });
  }
  handleUpdateReminder = (rmdr) => {
    //must find and udpate database
    const userId = this.state.user._id;
    const rmdrId = rmdr._id;
    api.updateUserReminder(userId, rmdrId, rmdr).then(() => {
      console.log('updated user reminder', res);
    })
    this.loadReminders();
  }

  handleRenderMap = (rmdr) => {
    this.setState({
      lat : rmdr.coordinates.lat,
      lng : rmdr.coordinates.lng,
      address : rmdr.address,
      isMapModalOpen: true
    })
  }

  loadReminders = () => {
    console.log('I am trying to load reminders for', this.props.user.firstName);
    const user = this.props.user;
    //might need to get a for loop to iterate states of res.data.reminders
    api.getUserReminders(user._id)
      .then(res => {
        console.log("I got my reminders back!");
        console.log('res.data:', res.data);
        this.setState({ reminders: (Array.isArray(res.data) ? [...res.data] :  [...user.reminders]) });
        // Cookies.set('reminders',res.data, { path: '/user'} );
        console.log('this.props',this.props);
        console.log(this.state.reminders);
      })
      .catch(err => console.error(err));
  }
  getUpcomingReminders =() => {
    return this.state.reminders.filter(rmdr => rmdr.notification > 0);
  }

  getPastReminders = () => {
    return this.state.reminders.filter(rmdr => rmdr.notification <= 0);
  }

  openUpdateModal = () => {
      this.setState({
      rmdrId: rmdr._id,
      rmdrName: rmdr.reminderName,
      rmdrTime: rmdr.time,
      rmdrNotification: rmdr.notification,
      rmdrNotificationNumber: rmdr.rmdrNotification,
      rmdrNotificxationLabel: rmdr.rmdrNotificationLabel,
      isUpdateModalOpen: false
    });
    this.setState({ isUpdateModalOpen: true});
  }

  render() {
    const {
      rmdrId,
      rmdrName,
      rmdrTime,
      user,
      rmdrNotification,
      rmdrNotificationNumber,
      rmdrNotificationLabel
    } = this.state;
    const upcomingRmdrs= this.getUpcomingReminders();
    const pastRmdrs = this.getPastReminders();
    console.log(this.state);

    return(
      <div>
        <div className="container">
          <h4 className="animated headShake" id="UpcomingEvents"> Revolve </h4>
          <div className="well" id="upcoming-well">
            {upcomingRmdrs.map(rmdr => 
            (<div>
              <Reminder 
                rmdr={rmdr}
                key={rmdr._id}
                handleUpdate={this.handleUpdateReminder}
                handleDelete={this.handleDelete}
                handleRenderMap={this.handleRenderMap} />
            </div>)
            )}
          </div>

          <div className="row">
            <RmdrForm user={this.props.user} reminders={this.state.reminders} />
          </div>

          <h4 className="animated headShake"> Past Reminders</h4>
          <div className="well" id="past-well">
            {pastRmdrs.map(rmdr => 
                (<Reminder 
                    rmdr={rmdr}
                    key={rmdr._id}
                    handleUpdate={this.handleUpdateReminder}
                    handleDelete={this.handleDelete}
                    />)
            )}
          </div>

        </div>
      </div>
    );
  }
}

export default RemindersWell;