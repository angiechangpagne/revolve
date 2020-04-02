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
  isAuthenticated: null,
  user: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch(action.type){
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
      //returns the updated state of the union, and the responsee

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case AUTH_FAIL:
      return {
        ...state, 
        user: null, 
        isAuthenticated: false,
      }

      default: 
        return state;

    }
}
