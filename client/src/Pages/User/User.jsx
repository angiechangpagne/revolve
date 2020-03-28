import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import { Cookies, withCookies } from 'react-cookie';

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
  constructor(props){
    super(props);
    this.state={
      user: "",
      userCookie:"",
      reminders: [],
      isModalOpen: false
    }
  }

  componentWillMount(){
    // if(!this.props.cookies.get('user')) { //unidentified entity
    //   console.log('log in again');
    //   this.props.cookies.remove('user');
    //   window.location.href="/";
    // }
    this.setState({ userCookie : this.props.userCookie,
                    reminders: this.props.userCookie.reminders || [] 
                  });
    // setCookie('reminders',[]);
    //set user state initialized to this.props.cookies
    console.log('line 15 user this.props.user from with hook', this.props.user);
    console.log('and Cookies is', Cookies);
    // console.log('this.props.cookies get reminders', this.props.cookies.getJSON('reminders'))
    // user.reminders.push(...props.reminders);
  }
    
    render(){
      console.log('this.props.children', this.props.children)
      return (
        <React.Fragment>
        <div className="user-wrapper">
          <div className="row">
            <NavBar userCookie={this.state.userCookie} onChange={this.props.onChange} handleUserDelete={this.props.handleUserDelete}/>
          </div>
  
          <div className="row">
            <RemindersWell userCookie={this.state.userCookie} reminders={this.state.reminders} onChange={this.props.onChange} isModalOpen={this.state.isModalOpen}/>
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

export default withCookies(User);