import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import { getCookie, setCookie, removeCookie } from 'react-cookie';

// import {Cookies as UniversalCookies} from "universal-cookie";
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
      user: {},
      reminders: [],
      isModalOpen: false,
    }
  }

  componentWillMount(){
    if(!getCookie('user') || !getCookie('user').id){ //unidentified entity
      console.log('log in again');
      removeCookie('user');
      window.location.href="/";
    }
    this.setState({ user : getCookie('user') });
    // setCookie('reminders',[]);
    //set user state initialized to Cookies
    console.log('line 15 user Cookies from withCookies hook', getCookie('user'));
    // console.log('Cookies get reminders', getCookieJSON('reminders'))
    // user.reminders.push(...props.reminders);
  }
    
    render(){
      return (
        <React.Fragment>
        <div className="wrapper">
          <div className="row">
            <NavBar/>
          </div>
  
          <div className="row">
            <RemindersWell user={this.state.user} isModalOpen={this.state.isModalOpen}/>
          </div>
  
          <div className="row">
            <div>
                <Human className="clearfix">
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