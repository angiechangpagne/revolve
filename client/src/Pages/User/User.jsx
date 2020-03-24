import React, { Component } from 'react';
import Human from "../../components/Human/Human";
import "./User.css";
import NavBar from "../../components/NavBar/NavBar";
import RmdrForm from "../../components/RmdrForm/RmdrForm";
import RemindersWell from "../../components/RemindersWell/RemindersWell";
import Cookies2 from "js-cookie";
import MapRender from "../../components/Map/Map";
import LinkGoogleMaps from "../../components/LinkGoogleMaps/LinkGoogleMaps";

const User = () => {
    const user = Cookies2.getJSON('user');
    console.log("line 15 of user, user:", user);
    return (
      <div className="wrapper">
        <div className="row">
          <NavBar/>
        </div>
        <div className="row">
          <div className="col-sm-12">
              <Human className="clearfix" backgroundImage="../../public/assets/background.jpg">
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

export default User;