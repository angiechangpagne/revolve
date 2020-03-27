import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';
import { withCookies } from 'react-cookie';

const Landing = (props) => {
  console.log("props on line 7 of landin",props.cookies.get('user'), props);
  console.log('user', props.user)
  return (
    <React.Fragment>
    {
    <div>
       
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <a id="foo"> <LoginForm user={props.user} onChange={props.onChange}/></a>
          </div>
        </div>
        <br></br><br></br>
        <Human>
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
export default withCookies(Landing);