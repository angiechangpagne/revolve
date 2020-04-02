import axios from 'axios';
import { returnStatus } from './statusActions';
import api from '../Utils/api';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
} from './types';

//local testing
// axios.defaults.baseURL='http://localhost:3000';

//production url
export const isAuth = (loginData) => (dispatch) => {
  axios
    .get('/api/users/login', loginData)
    .then((res) => {
      if(res.data.isValidEmail && res.data.isValidPassword){
          console.log('valid username and email in authActions, dispatch');
      }
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
export const signup = (userData) => (dispatch) =>{
axios
      .post('/api/signup', userData, {
        headers: { 'content-type': 'application/json' }})
      .then((res) => {
        console.log('res on line 45 of authActions is', res) //promise chain response from server request
        if(res.data.isEmailUnique){
          dispatch(returnStatus(res, res.status,'SIGNUP_SUCCESS'));
          dispatch({ type: IS_LOADING })
        }
        else{
          console.log('email not unique');
          dispatch(returnStatus(res,res.status, 'SIGNUP_FAIL'));
        }
      })
      .catch((err) => {
        dispatch(returnStatus(err, err.status, 'SIGNUP_FAIL'))
        dispatch({
          type: SIGNUP_FAIL
        });
        dispatch({ type: IS_LOADING })
      });
};

//LOGIN User
export const login = (loginData) => (dispatch) => {
  axios
    .post('/api/login', loginData)
    .then((res) => {
        console.log('res in authActions',res);
        console.log('res.data',res.data);
        console.log('res.data.userInfo',res.data.userInfo);
       if(res.data.isValidEmail && res.data.isValidPassword){
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        dispatch({ type: IS_LOADING });
       }
    }).catch((err) => {
      dispatch(returnStatus(err, err.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//LOGOUT USER AND DESTORY SESSION
export const signout = () => (dispatch) => {
  axios 
    .delete('/api/users/signout')
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    }).catch((err) => {
      console.log(err);
    });
}
