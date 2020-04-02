import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import statusReducer from './statusReducer';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  ui: uiReducer,
  status: statusReducer,
});

export default rootReducer;

