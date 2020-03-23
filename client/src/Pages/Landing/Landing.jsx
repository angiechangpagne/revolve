import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';
const path = require('path');

const Landing = (props) => {
  // console.log("props on line 7 of landin",props);
  return (
    <React.Fragment>
    {
    <div>
       
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <a id="foo"> <LoginForm> {props} </LoginForm></a>
          </div>
        </div>
        <br></br><br></br>
        <Human backgroundImage={`${path.resolve(__dirname, '/assets/background.jpg')}`}>
          <div className="arrow-container animated fadeInDown">
            <div className="arrow-2">
            <a href='#foo'> <i className="glyphicon glyphicon-arrow-down"></i></a>
            </div>
            <div className="arrow-1 animated hinge infinite zoomIn"></div>
          </div>
        </Human>
      </div>
    }
    </React.Fragment>
  )
}
export default Landing;