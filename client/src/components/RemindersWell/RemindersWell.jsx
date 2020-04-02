import React, { Component } from 'react';
import Modal from 'react-modal';
import api from '../../Utils/api';
import Reminder from '../Reminder/Reminder';
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
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
      isFormModalOpen: false,
      isMapModalOpen: false,
      lat: '',
      lng: '',
      address: '',
      user: '',
      userCookie:''
    }
    this.handleDelete=this.handleDelete.bind(this); //bindint to this class context
    this.handleUpdate=this.handleUpdate.bind(this);
    this.handleRenderMap=this.handleRenderMap.bind(this);
    this.onUpdateReminder=this.onUpdateReminder.bind(this);
    this.loadReminders=this.loadReminders.bind(this);
    this.getPastReminders=this.getPastReminders.bind(this);
    this.getUpcomingReminders=this.getUpcomingReminders.bind(this);
    this.openFormModal=this.openFormModal.bind(this);
    this.openUpdateModal=this.openUpdateModal.bind(this);
  }
  
  componentWillMount() {
    const user = this.props.user;
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
    api.deleteUserReminder(user._id, rmdr._id)
      .then(() => {
        //cookie will update on the loadReminders
        this.loadReminders();
      });
  }
  handleUpdate = (rmdr) => {
    //must find and udpate database

    this.setState({
      rmdrId: rmdr._id,
      rmdrName: rmdr.reminderName,
      rmdrTime: rmdr.time,
      rmdrNotification: rmdr.notification,
      rmdrNotificationNumber: rmdr.rmdrNotification,
      rmdrNotificxationLabel: rmdr.rmdrNotificationLabel,
      isUpdateModalOpen: false
    });
  }

  handleRenderMap = (rmdr) => {
    this.setState({
      lat : rmdr.coordinates.lat,
      lng : rmdr.coordinates.lng,
      address : rmdr.address,
      isMapModalOpen: true
    })
  }

  onUpdateReminder = () => {
    this.setState({
      rmdrId: '',
      rmdrName: '',
      rmdrTime: '',
      rmdrNotification: '',
      rmdrNotificationLabel: '',
      rmdrNotificationNumber: '',
      isUpdateModalOpen: false
    });
    this.loadReminders();

    console.log('on update reminder')
  }

  loadReminders = () => {
    console.log('I am trying to load reminders for', this.state.user.firstName);
    const { user } = this.state;
    //might need to get a for loop to iterate states of res.data.reminders
    api.getUserReminders(this.state.user._id)
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
  getUpcomingReminders(){
    return this.state.reminders.filter(rmdr => rmdr.notification > 0);
  }

  getPastReminders(){
    return this.state.reminders.filter(rmdr => rmdr.notification <= 0);
  }

  openFormModal = () => {
    this.setState({ isFormModalOpen: true });
  }

  openUpdateModal = () => {
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
          <h4 className="animated headShake" id="UpcomingEvents"> Revolve Reminders </h4>
          <div className="well" id="upcoming-well">
            {upcomingRmdrs.map(rmdr => 
            (<div>
              <Reminder 
                rmdr={rmdr}
                key={rmdr._id}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleRenderMap={this.handleRenderMap} />
            </div>)
            )}
          </div>

          <div className="row">
              <div>
                  <RmdrForm user={this.state.user} reminders={this.props.reminders} isModalOpen={this.state.isFormModalOpen} />
              </div>
          </div>
          <p id="need-acct" className="animated bounceInLeft"><span><button type="submit" onClick={this.openModal}>Set A Revolve Reminder</button></span></p>
          

          <h4 className="animated headShake"> Past Reminders</h4>
          <div className="well" id="past-well">
            {pastRmdrs.map(rmdr => 
                (<Reminder 
                    rmdr={rmdr}
                    key={rmdr._id}
                    handleDelete={this.handleDelete}
                    />)
            )}
          </div>
          <Modal isOpen={this.state.isUpdateModalOpen}>
            <Reminder user={this.state.user}
              rmdrId={rmdrId}
              rmdrName={rmdrName}
              rmdrTime={rmdrTime}
              rmdrNotification={rmdrNotification}
              rmdrNotificationNumber={rmdrNotificationLabel}
              handleSubmit={this.onUpdateReminder} />
          </Modal>

        </div>
      </div>
    );
  }
}

export default RemindersWell;