import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'unstated';
import decode from 'jwt-decode';
import 'semantic-ui-css/semantic.min.css';


import LoginContainer from './containers/LoginContainer'

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

const loginContainer = new LoginContainer();

if (localStorage.userJWT) {
    const token = localStorage.userJWT 
    loginContainer.doLogin(token)
}

ReactDOM.render(<BrowserRouter>
    <Provider inject={[loginContainer]}>
        <Route component={App} />
    </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
