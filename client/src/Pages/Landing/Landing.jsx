import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';
import { Cookies, withCookies } from 'react-cookie';

const Landing = (props) => {
  console.log("props on line 7 of landing",props);
  console.log('user', props.userCookie);
  console.log('Cookies is', console.log(Cookies));
  return (
    <React.Fragment>
    {
    <div className="landing" id="land">
        <div className="container">
        <p></p>
        <h3>Revolve Reminders</h3>
        
          <div className="col-sm-8 col-sm-offset-2">
          <a id="arr"> <LoginForm userCookie={props.userCookie} onChange={props.onChange}/></a>
          </div>
          <Human>
            <div className="arrow-container animated fadeInDown">
              <div className="arrow-2">
              <a href='#arr'> <i className="glyphicon glyphicon-arrow-right"></i></a>
              </div>
              <div className="arrow-1 animated hinge infinite zoomIn"></div>
            </div>
          </Human>
        </div>
      </div>
    }
    </React.Fragment>
  )
}
export default withCookies(Landing);