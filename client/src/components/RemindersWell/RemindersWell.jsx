import React, { Component } from 'react';
import Modal from 'react-modal';
import API from '../../Utils/api';
// import RmdrForm from '../RmdrForm/RmdrForm';
import Reminder from '../Reminder/Reminder';

class RemindersWell extends Component{
  state = {
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

  componentWillMount() {
    this.loadReminders();
  }

  handleDelete = (rmdr) => {
    const { user } = this.props;
    API.deleteUserReminder(user._id, rmdr._id)
      .then(() => {
        this.loadReminders();
      });
  }
  handleUpdate = (rmdr) => {
    this.setState({
      rmdrId: rmdr._id,
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
    console.log('I am trying to load reminders');

    API.getUserReminders(this.props.user._id)
      .then(res => {
        console.log("I got my reminders back!");
        console.log(res.data[0].reminders);
        this.setState({ reminders: res.data[0].reminders });
      })
      .catch(err => console.error(err));
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
            <div>
              <Reminder 
                rmdr={rmdr}
                key={rmdr._id}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleRenderMap={this.handleRenderMap} />
            </div>
            )}
          </div>
          <h4 className="animated headShake"> Past Reminders</h4>
          <div className="well" id="past-well">
            {pastRmdrs.map(rmdr => 
                <Reminder 
                    rmdr={rmdr}
                    key={rmdr._id}
                    handleDelete={this.handleDelete}
                    />
            )}
          </div>
          <Modal isOpen={this.state.isModalOpen}>
            <Reminder user={user}
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

  getUpcomingReminders(){
    return this.state.reminders.filter(rmdr => rmdr.notification > 0);
  }

  getPastReminders(){
    return this.state.reminders.filter(rmdr => rmdr.notification <= 0);
  }
}

export default RemindersWell;