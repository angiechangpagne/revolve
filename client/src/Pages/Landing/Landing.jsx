import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';

const Landing = (props) => {
  console.log("props on line 7 of landing",props);
  return (
    <React.Fragment>
    {
    <div className="landing" id="land">
        <p></p>
          <h3>Revolve Reminders</h3>
          <LoginForm/>
          <Human>
            <div className="arrow-container animated fadeInDown">
              <div className="arrow-2">
              <a href='#arr'> <i className="glyphicon glyphicon-arrow-right"></i></a>
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