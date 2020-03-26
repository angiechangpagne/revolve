import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import Cookies2 from "js-cookie";
import MapRender from "../../components/Map/Map";
import LinkGoogleMaps from "../../components/LinkGoogleMaps/LinkGoogleMaps";
{/* <div className="row" id='pac-input'>
<span id='map'><MapRender /></span>
<span>
  <LinkGoogleMaps />
</span>
</div> */}
//pass in user Cookies to track .id
class User extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: '',
      reminders: [],
      isModalOpen: false,
    }
  }

  componentWillMount(){
    const user = Cookies2.getJSON('user');
    Cookies2.set('reminders',[]);
    console.log('Cookies2 get user', Cookies2.getJSON('user'));
    console.log('Cookies2 get reminders', Cookies2.getJSON('reminders'))
    // user.reminders.push(...props.reminders);
    console.log("line 15 of user, user:", user);
    console.log('props in user', this.props);
  }
    
    
    render(){
      return (
        <React.Fragment>
        <div className="wrapper">
          <div className="row">
            <NavBar/>
          </div>
  
          <div className="row">
            <RemindersWell user={this.state.user} />
          </div>
  
          <div className="row">
            <div>
                <Human className="clearfix" backgroundImage="">
                  <div className="row">
                    <div>
                      <RmdrForm user={this.state.user} isModalOpen={this.state.isModalOpen} />
                    </div>
                  </div>
                 
                </Human>
            </div>
          </div>
        </div>
        </React.Fragment>
        
      );
    }
}

export default User;