import React, { Component } from 'react';
import Modal from 'react-modal';
import api from '../../Utils/api';
import Reminder from '../Reminder/Reminder';
//props sent from user, use for get, redirect exit
//delete
import Cookies from "js-cookie";

class RemindersWell extends Component{
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
      isModalOpen: false,
      isMapModalOpen: false,
      lat: '',
      lng: '',
      address: '',
    }
    this.handleDelete=this.handleDelete.bind(this); //bindint to this class context
    this.handleUpdate=this.handleUpdate.bind(this);
    this.handleRenderMap=this.handleRenderMap.bind(this);
    this.onUpdateReminder=this.onUpdateReminder.bind(this);
    this.loadReminders=this.loadReminders.bind(this);
    this.getPastReminders=this.getPastReminders.bind(this);
    this.getUpcomingReminders=this.getUpcomingReminders.bind(this);
  }
  
  componentWillMount() {
    if(!this.props){
      console.log('log in again');
      Cookies.remove('user');
      window.location.href="/";
    }
    const {
      user,
      rmdrName,
      rmdrNotification,
      rmdrNotificationLabel,
      rmdrNotificationNumber
    } = this.props;
     //set the userer cookie state
     this.setState({
      rmdrName: rmdrName || '',
      rmdrTime: new Date(),
      rmdrNotification: rmdrNotification || '',
      rmdrNotificationNumber: rmdrNotificationNumber || user.mobileNumber, 
      rmdrNotificationLabel: rmdrNotificationLabel || '',
      user: user || {}
    });
    this.loadReminders();
  }

  handleDelete = (rmdr) => {
    const { user } = this.props;
    api.deleteUserReminder(user.id, rmdr.id)
      .then(() => {
        this.loadReminders();
      });
  }
  handleUpdate = (rmdr) => {
    this.setState({
      rmdrId: rmdr.id,
      rmdrName: rmdr.reminderName,
      rmdrTime: rmdr.time,
      rmdrNotification: rmdr.notification,
      rmdrNotificationNumber: rmdr.rmdrNotification,
      rmdrNotificxationLabel: rmdr.rmdrNotificationLabel,
      isModalOpen: true
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
      isModalOpen: false
    });
    this.loadReminders();

    console.log('on update reminder')
  }

  loadReminders = () => {
    console.log('I am trying to load reminders for', this.props.user.firstName);

    //might need to get a for loop to iterate states of res.data.reminders
    api.getUserReminders(this.props.user.id)
      .then(res => {
        console.log("I got my reminders back!");
        console.log('res.data:', res.data);
        this.setState({ reminders: (Array.isArray(res.data) ? [...res.data] :  [...this.props.user.userInfo.reminders]) });
        console.log('this.props.user.userInfo',this.props.user.userInfo)
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

  render() {
    const { user } = this.props;
    const {
      rmdrId,
      rmdrName,
      rmdrTime,
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
                key={rmdr.id}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleRenderMap={this.handleRenderMap} />
            </div>)
            )}
          </div>

          <p id="need-acct" className="animated bounceInLeft">Need an account?<span><a id="sign-up" onClick={this.openModal}>&nbsp;&nbsp;&nbsp;SIGN UP</a></span></p>

          <h4 className="animated headShake"> Past Reminders</h4>
          <div className="well" id="past-well">
            {pastRmdrs.map(rmdr => 
                (<Reminder 
                    rmdr={rmdr}
                    key={rmdr.id}
                    handleDelete={this.handleDelete}
                    />)
            )}
          </div>
          <Modal isOpen={this.state.isModalOpen}>
            <Reminder user={this.props}
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