import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import Cookies from 'js-cookie';

// import {this.props.cookies as Universalthis.props.cookies} from "universal-cookie";
import MapRender from "../../components/Map/Map";
import LinkGoogleMaps from "../../components/LinkGoogleMaps/LinkGoogleMaps";
{/* <div className="row" id='pac-input'>
<span id='map'><MapRender /></span>
<span>
  <LinkGoogleMaps />
</span>
</div> */}
//pass in user this.props.cookies to track .id
class User extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state={
  //     user: "",
  //     userCookie:"",
  //     reminders: [],
  //     isModalOpen: false
  //   }
  // }
  // componentWillMount(){
  //   // if(!Cookies2.get('user') && !this.props.userCookie) { //unidentified entity
  //   //   console.log('log in again');
  //   //   // this.props.cookies.remove('user');
  //   //   window.location.href="/";
  //   // }
  //   // this.setState({ 
  //   //                 user: Cookies2.getJSON('user'),
  //   //                 reminders: Cookies2.getJSON('user').userInfo.reminders || [] 
  //   //               });
  //   // setCookie('reminders',[]);
  //   //set user state initialized to this.props.cookies
  //   console.log('line 15 user', this.props);
  //   console.log('and Cookies is', Cookies2);
  //   // console.log('this.props.cookies get reminders', this.props.cookies.getJSON('reminders'))
  //   // user.reminders.push(...props.reminders);
  // }
    
    render(){
      const user = Cookies.getJSON('user');
      // console.log('this.props.children', this.props.children)
      return (
        <React.Fragment>
        <div className="user-wrapper">
          <div className="row">
            <NavBar user={user} />
          </div>
  
          <div className="row">
            <RemindersWell user={user} />
          </div>
  
          <div className="row">
            <div>
                <Human className="clearfix">
                 
                </Human>
            </div>
          </div>
        </div>
        </React.Fragment>
        
      );
    }
}

export default User;