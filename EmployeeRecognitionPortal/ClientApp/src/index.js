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
    console.log(decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDk4NzE5OTEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.RhsI31twMhwsNESFFallW__zQ4J7_JT6mejHaczM1Mk'))
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
