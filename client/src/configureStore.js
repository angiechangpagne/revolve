import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export const history = createBrowserHistory(); //history object

// const initialStore = {};
const enhancers = [];

// if (process.env.NODE_ENV ==='development') {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }
// export const store;

//TO DO: IN ORDER TO HAVE TIME TRAVEL WE MUST HAVE ENHANCERS, THEREFORE WE MUST HAVE REDUX
export const configureStore = (preloadedState) => {
  const middleware = [thunkMiddleware, routerMiddleware(history)];
  const middlewareEnhancer =  applyMiddleware(...middleware);
  enhancers.push(middlewareEnhancer);
  const composeEnhancers = compose(...enhancers);
  const store = createStore(
    rootReducer(history), 
    preloadedState,
    composeEnhancers
  );
  
  if (process.env.NODE_ENV !=='production' && module.hot) {
      module.hot.accept(rootReducer, () => {
      store.replaceReducer(rootReducer);
      });
  }
  return store;
}

export default configureStore;