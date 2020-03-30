import axios from 'axios';
import { returnStatus } from './statusActions';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
} from './types';

//local testing
axios.defaults.baseURL='http://localhost:3000';


//production url
export const isAuth = () => (dispatch) => {
  axios
    .get('/api/users/authchecker', { withCredentials:true })
    .then((res) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data
      })
    }).catch((err) => {
      dispatch({
        type: AUTH_FAIL
      });
    });
}


//new user
export const register = ({ firstname, lastname,  email, password , mobileNumber }) => (dispatch) =>{

//Req body
// const body = JSON.stringify({ firstname, lastname, email, password, mobileNumber });

axios
      .post("/api/users/register", userData)
      .then((res) => {
        dispatch(returnStatus(res.data, res.status,'REGISTER_SUCCESS'));
        dispatch({ type: IS_LOADING })
      })
      .catch((err) => {
        dispatch(returnStatus(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
          type: REGISTER_FAIL
        });
        dispatch({ type: IS_LOADING })
      });

};

//LOGIN User
export const login = ({ email, password }) => (dispatch) => {
  // const body = JSON.stringify({ email, password });

  axios
    .post('/api/users/login', userData)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch({ type: IS_LOADING });
    }).catch((err) => {
      dispatch(returnStatus(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      });
      dispatch({ type: IS_LOADING })
    });
};

//LOGOUT USER AND DESTORY SESSION
export const logout = () => (dispatch) => {
  axios 
    .delete('/api/users/logout', { withCredentials: true })
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    }).catch((err) => {
      console.log(err);
    });
}
