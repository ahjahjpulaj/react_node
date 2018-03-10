import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';
// import reducers from './reducers';
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);


//components
import App from "./App";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";


import { AUTH_USER } from './actions/auth';

//store
import configureStore from './store/ConfigureStore';

//css
import './index.css';

const store = configureStore();

const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
    console.log("here");
  store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
         <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
         </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();


