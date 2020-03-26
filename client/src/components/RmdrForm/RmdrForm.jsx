import React, { Component } from 'react';
import api from '../../Utils/api';
import './RmdrForm.css';
import DatePicker from 'react-datepicker';
import Cookies2 from "js-cookie";

import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Search from './Search';
//css for react select
// import 'react-select/dist/react-select.css';
//require for auto completie address as input form 
// import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

    // {/* <button 
    //           id="buttonlogintoregister"
    //           className="animated-bounceInLeft"
    //           type="submit"
    //           onClick={this.handleFormSubmit}>Submit 
    //         </button> */}
//update
 //   if(this.props.rmdrId){
      //     console.log("I am about to update reminder");
  //replace with findOne by reminder ID and check if it is already there
          // api.updateUserReminder(this.state.user.id, rmdrId,{
          //   reminderName: this.state.rmdrName,
          //   time: this.state.rmdrTime,
          //   reminderNumber: this.state.rmdrNotification,
          //   notification: this.state.rmdrNotification,
          //   notificationLabel: this.state.rmdrNotificationLabel
          // })
          
          // geocodeByAddress(this.state.address)
          // .then(results => getLatLng(results[0]))
            // .then(latLng => API.updateUserReminder(this.props.user._id, this.props.rmdrId, {
            //   reminderName: this.state.rmdrName,
            //   time: this.state.rmdrTime,
            //   reminderNumber: this.state.rmdrNotification,
            //   notification: this.state.rmdrNotification,
            //   notificationLabel: this.state.rmdrNotificationLabel,
            //   address: this.state.address,
            //   coordinates: latLng
            // }))
  
            // .then(res => {
            //   //empty the elemeents
            //   this.setState({
            //     rmdrName : res.data.rmdrName,
            //     rmdrTime : new Date(),
            //     rmdrNotification : "",
            //     rmdrNotificationLabel : "",
            //   });
            //   window.location.reload();
            // })
            // .catch(err => console.log(err))
        // } else {

 // geocodeByAddress(this.state.address)
            //   .then(results => getLatLng(results[0]))
            //   .then(latLng => API.saveUserReminder(this.props.user._id,this.props.rmdrId, {
            //     reminderName : this.state.rmdrName,
            //     time : this.state.rmdrTime,
            //     reminderNumber : this.state.rmdrNotificationNumber,
            //     notification : this.state.rmdrNotification,
            //     notificationLabel : this.state.rmdrNotificationLabel,
            //     address : this.state.address,
            //     coordinates : latLng
            //   }))
 // { value: '20', label: '20 minutes' },
                  // { value: '15', label: '15 minutes' },
                  // { value: '10', label: '10 minutes' },
                  // { value: '5', label: '5 minutes' },
                  // { value: '2', label: '2 minutes' },
              //     <PlacesAutocomplete 
              //     classNames={cssClasses}
              //     type="text"
              //     value={this.state.address}
              //     onChange={this.setAddress}
              //     id="address"
              //     required
              // >{inputProps}</PlacesAutocomplete>
              // 
              //<div className="group">
              // <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g&libraries=places" onLoad={this.handleScriptLoad}></Script>
              // <Search> {props.children}</Search>
              // <span className="highlight"></span>
              // <span className="bar"></span>
              // <label className="animated bounceInLeft"> address</label>
              // </div>
class RmdrForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      rmdrName : "",
      rmdrNotification : '1',
      rmdrNotificationLabel : '1 minute',
      date: new Date(),
      rmdrTime : new Date(),
      rmdrNotificationNumber : "",
      isRmdrNameEmpty: false,
      isRmdrNotificationNumberEmpty : false,
      isRmdrNotificationLabelEmpty : false,
      isRmdrNotificationEmpty : false, 
      isRmdrTimeEmpty : false,
      reminders : [],
      address : "",
      setAddress: (address) => {
        this.setState({ 
          address : address
        });
      }
    };
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.handleNotificationChange=this.handleNotificationChange.bind(this);
    this.setAddress=this.setAddress.bind(this);
    this.validate=this.validate.bind(this);
  }
  
  componentWillMount(){
    if(!this.props){
      console.log('log in again');
      Cookies2.remove('user');
      console.log('cookies', Cookies2);
      window.location.href="/";
    }
    const {
      user
    } = this.props;

    //set the userer cookie state
    this.setState({
      rmdrNotificationNumber:  user.mobileNumber, 
      user: user || {}
    });
  }
  componentDidMount(){
    //if there is no user cookie, reroute to the login page
    if(this.props===undefined){
      // window.location.redirect('./LoginForm');
      Cookies2.remove('user');
      console.log(Cookies2);
      window.location.href = "/";
    }
    else {
      console.log(this.props.user);
      console.log("I have a cookie access");
      console.log(Cookies2);
    }
  }

  // shouldComponentUpdate(){

  // }
  handleInputChange = (event) => {
    //update state for ever key stroke change in input elements
    
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
    this.validate();
  };

  validate=() => {
  const newState = {}; //do not reset state or else post request will process without routing to axios
    const{
      rmdrName,
      rmdrNotification,
      rmdrTime,
      rmdrNotificationLabel,
      rmdrNotificationNumber
    } = this.state;
    
    const validationStates = [
      { input : rmdrName, validation : "isRmdrNameEmpty"},
      { input : rmdrNotificationNumber, validation : "isRmdrNotificationNumberEmpty"},
      { input : rmdrTime, validation : "isRmdrTimeEmpty"},
      { input : rmdrNotification, validation : "isRmdrNotificationEmpty"},
      { input : rmdrNotificationLabel, validation : "isRmdrNotificationLabelEmpty"}
    ];
        validationStates.forEach((stateElement) => {
          const inputExist = !!stateElement.input;
          console.log('inputExist', inputExist);
          newState[stateElement.validation] = !inputExist;
        });
      this.setState(newState);
  }

  //this method in binding inherits from places autocomplete, must have same method definition
  setAddress = (address) => {
    this.setState({ 
      address : address
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // if(this.props.user===undefined){
    //   Cookies2.remove('user');
    //   window.location.href="/";
    // }
    // console.log('to validate states');
    // const newState = {}; //do not reset state or else post request will process without routing to axios
    const{
      rmdrName,
      rmdrNotification,
      rmdrTime,
      rmdrNotificationLabel,
      rmdrNotificationNumber,
      isRmdrNameEmpty,
      isRmdrNotificationEmpty,
      isRmdrNotificationLabelEmpty,
      isRmdrTimeEmpty,
      isRmdrNotificationNumberEmpty
    } = this.state;
    
    // const validationStates = [
    //   { input : rmdrName, validation : "isRmdrNameEmpty"},
    //   { input : rmdrNotificationNumber, validation : "isRmdrNotificationNumberEmpty"},
    //   { input : rmdrTime, validation : "isRmdrTimeEmpty"},
    //   { input : rmdrNotification, validation : "isRmdrNotificationEmpty"},
    //   { input : rmdrNotificationLabel, validation : "isRmdrNotificationLabelEmpty"}
    // ];
    //     validationStates.forEach((stateElement) => {
    //       const inputExist = !!stateElement.input;
    //       console.log('inputExist', inputExist);
    //       newState[stateElement.validation] = !inputExist;
    //     });
    //   this.setState(newState);
      //if the state is already a a reminder, it is stored in the current form state from the previous create response
      if (!isRmdrNameEmpty && !isRmdrTimeEmpty && !isRmdrNotificationEmpty && !isRmdrNotificationNumberEmpty && !isRmdrNotificationLabelEmpty)
      {
        console.log("I am now about to create reminder");
       
        api.saveUserReminder(this.props.user.id, {
          reminderName : rmdrName,
          time : rmdrTime,
          reminderNumber : rmdrNotificationNumber,
          notification : rmdrNotification,
          notificationLabel : rmdrNotificationLabel
        })
        .then(res => {
        //empty out input elements
          console.log('res',res);
          console.log('res.locals',res.locals);
          console.log('res.data',res.data);
          this.setState({
              reminders  : this.state.reminders.push(
              {
                rmdrName : res.data.rmdrName,
                mdrTime : res.data.rmdrTime,
                rmdrId : res.data.id,
                rmdrNotification : res.data.rmdrNotification,
                rmdrNotificationLabel : res.data.rmdrNotificationLabel,
                address : "",
              }
              )
          })
          console.log('new reminder successfully added to associated user key', this.state.reminders);
          //reload page and refresh upcoming remminder well
          this.props.user.reminders=[...res.data.reminders];
          this.props.reminders=[...res.data.reminders];
          Cookies2.set('reminders',[...res.data.reminders]);
          window.location.href="/user";
          }).catch(err => console.log(err));
        }
  };
//moment(date).format('DD-MM-YYYY')
  handleDateChange = date => {
    this.setState({
      rmdrTime : date
    });
    this.validate();
  };

  handleNotificationChange = (selectedOption) => {
    this.setState({
      rmdrNotification : selectedOption.value,
      rmdrNotificationLabel : selectedOption.label
    });
    console.log(`Selected: ${selectedOption.label}`);
    this.validate();
  };

  // loadReminders = () => {
  //   console.log("I am trying to load my reminders");
  //   api.getUserReminders(this.props.user ? this.props.user.id : 17)
  //     .then(res => {
  //       console.log("I got my reminders back!");
  //       console.log(res.data[0].reminders);
  //       this.setState({ reminders: res.locals[0].reminders });
  //     })
  //     .catch(err => console.error(err));
  // }

  render() {
    console.log(this.state);

    console.log('reminders state', this.state.reminders);
    console.log('this.props.reminders', this.props.reminders);
    return (
      <div className="container animated pulse">
        <div className="box">
        <header className="animated headShake">
            <h1 id="logintoregister"><p></p>{`Greetings ${this.props.user.firstName}, let's set up your notifications`} </h1>
        </header>
        
          <form id="form" method="POST" className="topBefore animated headShake">
          <h4 id="group" className="title">Set a New Reminder</h4><p></p>
            <div className="group">
              <input 
                id="rmdr-name"
                name="rmdrName"
                className="inputMaterial"
                type="text"
                value={this.state.rmdrName}
                onChange={this.handleInputChange}
                required/>
                {this.state.isRmdrNameEmpty &&
                <div id="error-empty" className={!this.state.isRmdrNameEmpty ? "error-empty-div invisible" : "error-empty-div"}>
                  <p className="error-empty">Please provide a Reminder!</p>
                </div>
                }
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="animated bounceInLeft"> Reminder Name</label>
            </div>
            
            <div className="group">
              <input 
                  className="inputMaterial"
                  type="text" 
                  name="rmdrNotificationNumber"
                  onChange={this.handleInputChange}
                  id="rmdr-notif-num"
                  value={this.state.rmdrNotificationNumber}
                  required/>
                  {this.state.isRmdrNotificationNumberEmpty &&
                  <div id="error-empty" className={!this.state.isReminderNotificationNumberEmpty ? "error-empty-div invisible" : "error-empty-div"}>
                    <p className="error-empty">Please provide the number to send reminder to</p>
                  </div>
                  } 
              <span className="highlight"></span>
              <span className="bar"> </span>
              <label className="animated bounceInLeft">Mobile Number</label>
          </div>
      
          <div className="group">
              <DatePicker 
                className="inputMaterial"
                id="rmdr-date"
                name="rmdrTime"
                selected={this.state.rmdrTime}
                onChange={this.handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                />
              <span className="highlight"></span>
              <span className="bar"></span>
          </div>
            
            <div className="group">
              <Select 
                className="selectForm"
                name="rmdrNotification"
                onChange={this.handleNotificationChange}
                value={this.state.rmdrNotification}
                label={this.state.rmdrNotificationLabel}
                defaultValue='1'
                options = {[
                  { value: '1440', label: '1 day' },
                  { value: '120', label: '2 hours' },
                  { value: '5', label: '5 minutes' },
                  { value: '1', label: '1 minute' }
                ]} />
                 {this.state.isRmdrNotificationEmpty &&
                  <div id="error-empty" className={!this.state.isRmdrNotificationEmpty ? "error-empty-div invisible" : "error-empty-div"}>
                    <p className="error-empty">Please provide your notification Selection!</p>
                  </div>
                  } 
                <span className="highlight"></span>
                <span className="bar"></span>
            </div>
            <div className="group">
            <input id="buttonlogintoregister" type="submit" value="Full Send" value="Full Send" 
            className="loginHover" onClick={this.handleFormSubmit}></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}



export default RmdrForm;