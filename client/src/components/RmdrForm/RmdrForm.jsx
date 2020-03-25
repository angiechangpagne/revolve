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
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';


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
      rmdrName : undefined,
      rmdrNotification : undefined,
      rmdrNotificationLabel : undefined,
      date: new Date(),
      rmdrTime : undefined,
      rmdrNotificationNumber : undefined,
      isRmdrNameEmpty: true,
      isRmdrNotificationNumberEmpty : true,
      isRmdrNotificationEmpty : true, 
      isRmdrDateEmpty : true,
      isRmdrTimeEmpty : true,
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
    this.handleFormSubmit=this.handleInputChange.bind(this);
    this.handleNotificationChange=this.handleNotificationChange.bind(this);
    this.setAddress=this.setAddress.bind(this);
  }
  
  componentWillMount(){
    if(!this.props.user){
      console.log('log in again');
      Cookies2.remove('user');
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
    if(this.props.user===undefined){
      // window.location.redirect('./LoginForm');
      Cookies2.remove('user');
      window.location.href = "/";
    }
    else {
      console.log(this.props.user);
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

  //this method in binding inherits from places autocomplete, must have same method definition
  setAddress = (address) => {
    this.setState({ 
      address : address
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if(this.props.user===undefined){
      Cookies2.remove('user');
      window.location.href="/";
    }
    else{
      const validationStates = [
        { input : this.state.rmdrName, validation : "isRmdrNameEmpty"},
        { input : this.state.rmdrNotificationNumber, validation : "isRmdrNotificationNumberEmpty"},
        { input : this.state.rmdrTime, validation : "isRmdrTimeEmpty"},
        { input : this.state.rmdrNotification, validation : "isRmdrNotificationEmpty"},
        ];
      // if(!this.state.rmdrName || !this.state.rmdrNotificationNumber || !this.state.rmdrTime || !this.state.rmdrNotification){
        //set the validation states to their appropriate values
        //set validation states to their appropriate values
        validationStates.forEach(({input, validation}) => {
          let inputExist=!!input;
          console.log('inputExist', inputExist);
          validationStates[validation] = !inputExist;
          // (!stateElement.input) ? this.setState({[stateElement.validation] : false}) : this.setState({[stateElement.validation] : true })
          // console.log('validation state:',createNewRmdrStates);
        });
        this.setState(validationStates);
      //}//å if the state is already a a reminder, it is stored in the current form state from the previous create response
      // if (this.props.user && this.state.rmdrName && this.state.rmdrTime && this.state.rmdrNotification && this.state.rmdrNotificationNumber){
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
            if(this.props.user===undefined){
              console.log('user expired, please log in again');
              Cookies2.remove('user');
              window.location.href="/";
            }
            else{
              console.log("I am now about to create reminder");

              api.saveUserReminder(this.props.user.id, {
              reminderName : this.state.rmdrName,
              time : this.state.rmdrTime,
              reminderNumber : this.state.rmdrNotificationNumber,
              notification : this.state.rmdrNotification,
              notificationLabel : this.state.rmdrNotificationLabel
              }).then(res => {
                //empty out input elements
                this.setState({
                  rmdrName : res.data.rmdrName,
                  rmdrTime : res.data.rmdrTime,
                  rmdrId : res.data.id,
                  rmdrNotification : res.data.rmdrNotification,
                  rmdrNotificationLabel : res.data.rmdrNotificationLabel,
                  address : ""
                });
                console.log('new state from add', this.state);
                //reload page and refresh upcoming remminder well
                
              }).catch(err => console.log(err));
              window.location.reload();
            }
        }
  };
//moment(date).format('DD-MM-YYYY')
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

  render(){
      //console.log(this.state);
    //console.log(this.state.apptDate.format('LLL')); 
    //input props for address autocomplete
    const inputProps = {
      value : this.state.address,
      onChange : this.setAddress
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
            <h1 id="logintoregister"><p></p>{`Greetings ${this.props.user.firstName}, let's set up your notifications`} </h1>
          </div>
        
          <form>
            <div className="group">
              <input 
                id="rmdr-name"
                className="inputMaterial"
                type="text"
                name="rmdrName"
                value={this.state.rmdrName}
                onChange={this.handleInputChange}
                required/>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="animated bounceInLeft"> Reminder Name</label>
            </div>
            
            <div className="group">
              <input 
                  className="inputMaterial"
                  type="text" name="rmdrNotificationNumber"
                  value={this.state.rmdrNotificationNumber}
                  onChange={this.handleInputChange}
                  id="rmdr-notif-num"
                  required/>
              <span className="highlight"></span>
              <span className="bar"> </span>
              <label className="animated bounceInLeft">Mobile Number</label>
          </div>
      
            <div className="group">
              <DatePicker 
                className="inputMaterial"
                id="rmdr-date"
                selected={this.state.date}
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
                value={this.state.rmdrNotification}
                onChange={this.handleNotificationChange}
                options = {[
                  { value: '1440', label: '1 day' },
                  { value: '120', label: '2 hours' },
                  { value: '5', label: '5 minutes' },
                  { value: '1', label: '1 minute' }
                ]} />
                <span className="highlight"></span>
                <span className="bar"></span>
            </div>

            <button 
              id="buttonlogintoregister"
              className="animated-bounceInLeft"
              type="submit"
              onClick={this.handleFormSubmit}>Submit 
            </button>
          </form>
        </div>
      </div>
    )
  }
}



export default RmdrForm;