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
      
    ]
  }
}