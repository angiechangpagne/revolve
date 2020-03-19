import React, {Component } from 'react';
import Human from "../../Components/Human";
import "./User.css";
import NavBar from "../../Components/NavBar";
import RmdrForm from "../../Components/RmdrForm";
import RemindersWell from "../../Components/RemindersWell";
import Cookies2 from "js-cookie";
import MapRender from "../../Components/Map";
import LinkGoogleMaps from "../../Components/LinkGoogleMaps";

class User extends Component {
  render(){
    const user = Cookies2.getJSON('user');
    console.log("this.state on line 15 of user", this.state);
    return (
      <div className="wrapper">
        <div className="row">
          <NavBar/>
        </div>
        <div className="row">
          <div className="col-sm-12">
              <Human className="clearfix" backgroundImage="">
                <div className="row">
                  <div className="col-sm-4">
                    <RmdrForm user={user} />
                  </div>
                  <div className="col-sm-8">
                    <MapRender />
                  </div>
                </div>
              </Human>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-sm-offset-7">
            <LinkGoogleMaps />
          </div>
        </div>
        <div className="row">
          <RemindersWell user={user} />
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default User;