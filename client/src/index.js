import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login/Login';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
        </div>
    </BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
