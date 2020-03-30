import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILE,
  AUTH_SUCCESS,
  AUTH_FAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null,
};

export default (state = initialState, action) => {
  switch(action.type){
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthentication: true,
        user: aciton.payload
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
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
