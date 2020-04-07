import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Human from '../../components/Human/Human';
import './Landing.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import { buttonClicked } from '../../actions/uiActions';
import { isAuth } from '../../actions/authActions';

export class Landing extends React.Component{
  static propTypes = {
    button: PropTypes.bool,
    status: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  }

  render() {

    if(this.props.isAuthenticated) {
      return <Redirect to= '/user' />
    }

    return (
      <div className="landing" id="land">
          <p></p>
            <h2 id="revolve-front">Revolve Reminders</h2>
            <LoginForm/>
      </div>
    );
  }
}
//connecting the single universal state
const mapStateToProps = (state) => ({
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);