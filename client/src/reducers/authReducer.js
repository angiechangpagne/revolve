import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: "",
  isLoading: false,
  isEmailUnique:true,
};

export default function (state = initialState, action) {
  switch(action.type){
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
      //returns the updated state of the union, and the responsee
    // case AUTH_SUCCESS:

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case AUTH_FAIL:
      return {
        ...state, 
        user: null, 
        isAuthenticated: false,
      }

    case SIGNUP_FAIL:
      return {
        ...state,
        isEmailUnique: false,
      }

      default: 
        return state;

    }
}
