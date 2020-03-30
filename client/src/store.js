import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStore = {};
const middleware = [thunk];
const composeEnhancers = compose;


const store = createStore(rootReducer, initialState, composeEnhacers(
  applyMiddleware(...middleware),
))



export default store;