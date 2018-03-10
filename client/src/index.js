import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import configureStore from './store/ConfigureStore';

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
        </div>
    </BrowserRouter>
    </Provider>, 
document.getElementById('root'));
registerServiceWorker();
