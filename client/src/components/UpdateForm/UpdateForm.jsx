import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
// import './UpdateForm.css';
import '../Reminder/Reminder.css'; //same size and positioning on the reminder

export class UpdateForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen: "",
      rmdr: "",
      rmdrNotification: '1',
      rmdrNotificationLabel: '1 minute',
      rmdrNotificationNumber: "",
      rmdrTime: new Date(),
      rmdrName: ""
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleNotificationChange=this.handleNotificationChange.bind(this);
    this.closeModal=this.closeModal.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if(props){
      return(
        {
        isModalOpen: props.isModalOpen,
        rmdr: props.rmdr,
        rmdrNotificationNumber: props.reminderNumber
        }
      );
    }
    return null;
  }

  // componentDidMount(){
  //   // this.setState({
  //   //   isModalOpen: this.props.isModalOpen,
  //   //   rmdr: this.props.rmdr,
  //   //   rmdrNotificationNumber: this.props.reminderNumber
  //   // });
  // }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { 
      rmdrName, 
      rmdrNotification, 
      rmdrNotificationLabel,
      rmdrNotificationNumber,
      rmdrTime } = this.state;
    const reminder = this.props.rmdr; //aliasing original rmdr state back to props
    reminder.rmdrName=rmdrName;
    reminder.rmdrNotification=rmdrNotification;
    reminder.rmdrNotificationLabel=rmdrNotificationLabel;
    reminder.rmdrNotificationNumber=rmdrNotificationNumber;
    reminder.rmdrTime=rmdrTime;
    //do not check for empty, automatically filled with old components
    //send back same reminder with it's id and changed key value mappings
    this.props.handleUpdate(reminder); //still attached to original state, id, model attributes, etc
    this.closeModal();
  }

  handleDateChange = (date) => {
    this.setState({
      rmdrTime : date
    });
  }

  handleNotificationChange = (selectedOption) => {
    this.setState({
      rmdrNotification: selectedOption.value,
      rmdrNotificationLabel: selectedOption.label
    });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  render(){
    return (
      <Modal 
        id="modal" 
        className="col-sm-6 animated pulse"
        isOpen={this.state.isModalOpen}
        >
        <div className="panel-body">
           <form id="form" method="POST" className="topBefore animated headShake">
          <h5> Reminder Name </h5>
          <div className="group">
          <input id="rmdr-name"
                 name="rmdrName"
                 className="inputMaterial"
                 type="text"
                 value={this.state.rmdrName}
                 onChange={this.handleInputChange}  
                 />
          <span className="hightlight"></span>
          <span className="bar"></span>
          <label className="animated bounceInLeft"> Reminder Name </label>
          </div>
          <div className="group">
          <input id="rmdr-notif-num"
                 name="rmdrNotificationNumber"
                 className="inputMaterial"
                 value={this.state.rmdrNotificationNumber}
                 onChange={this.handleInputChange}
                 type="text"
                 /> 
          <span className="hightlight"></span>
          <span className="bar"></span>
          <label className="animated bounceInLeft"> Phone Number </label>
          </div>

          <div className="group">
            <DatePicker 
              className="inputMaterial"
              id="rmdr-date"
              name="rmdr-date"
              name="rmdrTime"
              selected={this.state.rmdrTime}
              onChange={this.handleDateChange}
              showTimeSelect
              dateFormat="Pp" 
              />
          <span className="hightlight"></span>
          <span className="bar"></span>
          </div>

          <div className="group">
            <Select
              className="selectForm"
              name="rmdrNotificaton"
              onChange={this.handleNotificationChange}
              value={this.state.rmdrNotification}
              label={this.state.rmdrNotificationLabel}
              defaultValue='1'
              options = {[
                { value: '1440', label: '1 day'},
                { value: '120', label: '2 hours' },
                { value: '5', label: '5 minutes' },
                { value: '1', label: '1 minute' } 
              ]} />
              <span className="hightlight"></span>
              <span className="bar"></span>
          </div>

          <div className="group">
            <span><iput id="submit" type="submit" value="Full Send" className="submitHover" onClick={this.handleSubmit}></iput></span>
          </div>
           </form>
        </div>          
        </Modal>
    );
   }
}


export default UpdateForm;