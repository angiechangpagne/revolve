import React, { Component } from 'react';
import API from '../../Utils/api';
import './RmdrForm.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PlaceesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class RmdrForm extends Component{
  state = {
    rmdrName : "",
    rmdrTime : moment(),
    rmdrNotification : "",
    rmdrNotificationLabel : "",
    rmdrNotificationNumber : "",
    isRmdrNameEmpty: false,
    isRmdrNotificationNumberEmpty : false,
    isRmdrNotificationEmpty : false, 
    isRmdrDateEmpty : false,
    isRmdrTimeEmpty : false,
    reminders : [],
    address : ""
  };

  componentWillMount(){
    const {
      user, 
      rmdrName,
      rmdrNotification,
      rmdrNotificationLabel,
      rmdrNotificationNumber
    } = this.props;

    //set the suer cookie state
    this.setState({
      rmdrName: rmdrName || '',
      rmdrTime: moment(),
      rmdrNotification: rmdrNotification || '',
      rmdrNotificationNumber: rmdrNotificationNumber || user.mobileNumber, 
      rmdrNotificationLabel: rmdrNotificationLabel || ''
    });
  }

  componentDidMount(){
    //if there is no user cookie, reroute to the login page
    if(!this.props.user){
      window.location.href = "/";
    }
    else {
      console.log("I have a cookie access");
    }
  }

  handleInputChange = (event) => {
    //update state for ever key stroke change in input elements
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const createNewRmdrStates = [
      { input : this.state.rmdrName, validation : "isRmdrNameEmpty"},
      { input : this.state.rmdrNotificationNumber, validation : "isRmdrNotificationNumberEmpty"},
      { input : this.state.rmdrTime, validation : "isRmdrTimeEmpty"},
      { input : this.state.rmdrNotification, validation : "isRmdrNotificationEmpty"},
    ];

    if(!this.state.rmdrName || !this.state.rmdrNotificationNumber || !this.state.rmdrTime || !this.state.rmdrNotification){
      //set the validation states to their appropriate values
      //set validation states to their appropriate values
      createNewRmdrStates.forEach(stateElement => {
        (stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true })
      });
    }
    else if (this.state.rmdrName && this.state.rmdrTime && this.state.rmdrNotification && this.state.rmdrNotificationNumber && this.state.address){
      if(this.props.rmdrId){
        console.log("I am about to update reminder");

        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => API.updateUserReminder(this.props.user._id, this.props.rmdrId, {
            reminderName: this.state.rmdrName,
            time: this.state.rmdrTime,
            reminderNumber: this.state.rmdrNotification,
            notification: this.state.rmdrNotification,
            notificationLabel: this.state.rmdrNotificationLabel,
            address: this.state.address,
            coordinates: latLng
          }))
          .then(res => {
            //empty the elemeents
            this.setState({
              rmdrName : "",
              rmdrTime : moment(),
              rmdrNotification : "",
              rmdrNotificationLabel : "",
              address : "",
            });
            window.location.reload();
          })
          .catch(err => console.log(err))
      } else {
        console.log("I am now about to create appointment");

        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => API.saveUserReminder(this.props.user._id,this.props.rmdrId, {
            reminderName : this.state.rmdrName,
            time : this.state.rmdrTime,
            reminderNumber : this.state.rmdrNotificationNumber,
            notification : this.state.rmdrNotification,
            notificationLabel : this.state.rmdrNotificationLabel,
            address : this.state.address,
            coordinates : latLng
          }))
          .then(res => {
            //empty out input elements
            this.setState({
              rmdrName : "",
              rmdrTime : moment(),
              rmdrNotification : "",
              rmdrNotificationLabel : "",
              address : ""
            });
            //reload page and refresh upcoming remminder well
            window.location.reload();


          })
          .catch(err => console.log(err))
      }
    }
  };

  handleDateChange = date => {
    this.setState({
      rmdrTime : date
    });
  };

  handleNotificationChange = (selectedOption) => {
    this.setState({
      rmdrNotification : selectedOption.value,
      rmdrNotificationLabel : selectedOption.label
    });
    console.log(`Selected: ${selectedOption.label}`);
  }

  loadReminders = () => {
    console.log("I am trying to load my reminders");
    API.getUserReminders(this.props.user._id)
      .then(res => {
        console.log("I got my reminders back!");
        console.log(res.data[0].reminders);
        this.setState({ reminders: res.data[0].reminders });
      })
      .catch(err => console.error(err));
  }

  onAddressChange = (address) => {
    this.setState({ address })
  }

  render(){
    const inputProps = {
      value : this.state.address,
      onChange : this.onAddressChange,
      placeholder :"address"
    }
    const cssClasses = {
      root: 'form-group',
      input: 'address-form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    return (
      <div className="container animated pulse">
        <div className="box">
          <div id="header">
            <h1 id="logintoregister">{`Greetings ${this.props.user.firstName}, let's set up your notifications`} </h1>
          </div>
          <form>
            <div className="group">
              <input 
                className="inputMaterial"
                type="text"
                name="rmdrName"
                value={this.state.rmdrName}
                onChange={this.handleInputChange}
                id="rmdr-name"
                required> </input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="animated bounceInLeft"> reminder name</label>
            </div>
            <div className="group">
              <PlacesAutocomplete 
                classNames={cssClasses}
                type="text"
                name="address"
                inputProps={inputProps}
                id="address"
                required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            {/*<label className="animated bounceInLeft"> address</label>*/}
            </div>
            <div className="group">
              <DatePicker 
                className="inputMaterial"
                id="rmdr-date"
                selected={this.state.rmdrTime}
                onChange={this.handleDateChange}
                showTimeSelect
                dateFormat="LLL"/>
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <input 
                  className="inputMaterial"
                  type="text" name="rmdrNotificationNumber"
                  value={this.state.rmdrNotificationNumber}
                  onChange={this.handleInputChange}
                  id="rmdr-notif-num"
                  required></input>
              <span className="highlight"></span>
              <span className="bar"> </span>
              <label className="animated bounceInLeft">mobile number</label>
            </div>
            <div className="group">
              <Select 
                className="selectForm"
                name="rmdrNotification"
                value={this.state.rmdrNotification}
                onChange={this.handleNotificationChanges}
                options = {[
                  { value: '2880', label: '2 days' },
                  { value: '1440', label: '1 day' },
                  { value: '120', label: '2 hours' },
                  { value: '30', label: '30 minutes' },
                  { value: '20', label: '20 minutes' },
                  { value: '15', label: '15 minutes' },
                  { value: '10', label: '10 minutes' },
                  { value: '5', label: '5 minutes' },
                  { value: '2', label: '2 minutes' },
                  { value: '1', label: '1 minute' }
                ]}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
            </div>
            <button 
              id="buttonlogintoregister"
              className="animated bounceInLeft"
              type="submit"
              onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default RmdrForm;