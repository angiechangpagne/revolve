import React from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import Cookies2 from "js-cookie";
import MapRender from "../../components/Map/Map";
import LinkGoogleMaps from "../../components/LinkGoogleMaps/LinkGoogleMaps";
//pass in user Cookies to track .id
const User = () => {
    const user = Cookies2.getJSON('user');
    console.log("line 15 of user, user:", user);
    return (
      <React.Fragment>
      <div className="wrapper">
        <div className="row">
          <NavBar/>
        </div>

        <div className="row">
          <RemindersWell user={user} />
        </div>

        <div className="row">
          <div>
              <Human className="clearfix" backgroundImage="">
                <div className="row">
                  <div>
                    <RmdrForm user={user} />
                  </div>
                </div>
                <div className="row" id='pac-input'>
                    <span id='map'><MapRender /></span>
                    <span>
                      <LinkGoogleMaps />
                  </span>
                </div>
              </Human>
          </div>
        </div>

      </div>
      </React.Fragment>
      
    );
}

export default User;