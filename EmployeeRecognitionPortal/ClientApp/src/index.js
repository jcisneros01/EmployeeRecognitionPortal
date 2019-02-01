import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import decode from 'jwt-decode';
import 'semantic-ui-css/semantic.min.css';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers';
import rootSaga from './sagas';
import { userLoggedIn } from './actions/authentication';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

if (localStorage.userJWT) {
    const token = localStorage.userJWT 
    store.dispatch(userLoggedIn(token))
}

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <Route component={App} />
    </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
