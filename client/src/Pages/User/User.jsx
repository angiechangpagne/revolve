import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RemindersWell from '../../components/RemindersWell/RemindersWell';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { buttonClicked, buttonReset } from '../../actions/uiActions';
import { isAuth, signout } from '../../actions/authActions';
// import {this.props.cookies as Universalthis.props.cookies} from "universal-cookie";
import MapRender from "../../components/Map/Map";
import store from '../../configureStore';
import LinkGoogleMaps from "../../components/LinkGoogleMaps/LinkGoogleMaps";
{/* <div className="row" id='pac-input'>
<span id='map'><MapRender /></span>
<span>
  <LinkGoogleMaps />
</span>
</div> */}
//pass in user this.props.cookies to track .id
export class User extends React.Component{
  static propTypes = {
    button: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }
  // constructor(props){
  //   super(props);
  //   this.state={
  //     user: "",
  //     userCookie:"",
  //     reminders: [],
  //     isModalOpen: false
  //   }
  // }
  componentDidMount(){
    //check is session cookie is present
    // store.dispatch(isAuth());
  }
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
      // if(!this.props.isAuthenticated){
      //   return <Redirect to="/" /> 
      // } //end redux chain here until navbar logout, clone user state and manipulate api with database directly, 
      //from here on, rest of app is not in need of redux during the session, state is updated without dispatching actions to redux store
      const user = this.props.authState.user.userInfo; //the original dbUser profiler
      const cloneUser=JSON.parse(JSON.stringify(user)); //tree recursively convert back

      console.log('authState', this.props.authState.user.userInfo)
      return (
        <React.Fragment>
        <div className="user-wrapper">
          <div className="row">
            <NavBar user={cloneUser} />
          </div>
  
          <div className="row">
            <RemindersWell user={cloneUser} />
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
const mapStateToProps = (state) => ({
  button: state.ui.button,
  authState: state.auth
});
export default connect(mapStateToProps, { isAuth, signout, buttonClicked, buttonReset })(User);