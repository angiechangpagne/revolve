import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import statusReducer from './statusReducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  status: statusReducer,
  routing: routerReducer
});