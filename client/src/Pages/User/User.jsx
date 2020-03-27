import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import { withCookies } from 'react-cookie';

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
      user: {},
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
    this.setState({ user : this.props.cookies.get('user') });
    // setCookie('reminders',[]);
    //set user state initialized to this.props.cookies
    console.log('line 15 user this.props.cookies from withthis.props.cookies hook', this.props.cookies.get('user'));
    // console.log('this.props.cookies get reminders', this.props.cookies.getJSON('reminders'))
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
            <RemindersWell user={this.state.user} onChange={this.props.onChange} isModalOpen={this.state.isModalOpen}/>
          </div>
  
          <div className="row">
            <div>
                <Human className="clearfix">
                  <div className="row">
                    <div>
                      <RmdrForm user={this.state.user} onChange={this.props.onChange} isModalOpen={this.state.isModalOpen} />
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

export default withCookies(User);