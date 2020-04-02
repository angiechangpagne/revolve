import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import store from '../../configureStore';
import { buttonClicked } from '../../actions/uiActions';
import { isAuth, login } from '../../actions/authActions';

class Landing extends React.Component{
  static propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    button: PropTypes.bool,
    status: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  render(){
    return (
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
    );
  }
}
const mapStateToProps = (state) => ({
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { buttonClicked })(Landing);