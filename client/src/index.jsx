import { hot } from 'react-hot-loader';
// import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import  configureStore, { history } from './configureStore';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';

// import { register } from './serviceWorker';
const store = configureStore();

const renderApp = () =>
    ReactDOM.render( 
    <div className="AppContainer">
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    </div>, 
    document.getElementById('root')
    )

//hot module reload 
if (process.env.NODE_ENV !== 'production' && module.hot){
    module.hot.accept(App, renderApp);
}
renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// register();