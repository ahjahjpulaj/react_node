import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

//components
import App from "./App";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

import { AUTH_USER } from './actions/auth';
import { GET_DATE, GET_CURRENT_DATE } from './actions/calendar';


import RequireAuth from './hoc/RequireAuth'

//store
import { persistor, store } from './store/ConfigureStore';

//css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'material-icons/css/material-icons.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'fullcalendar/dist/fullcalendar.css'
// import materialIcons from 'material-design-icons/iconfont/material-icons.css';
require('bootstrap');

const tokenUser = (localStorage.getItem('user'));

// if (tokenUser) {
//   store.dispatch({ type: AUTH_USER });
// }
store.dispatch({ type: GET_DATE });
store.dispatch({ type: GET_CURRENT_DATE });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <div>
              <Route exact path="/" component={RequireAuth(App)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Registration} />
          </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();


