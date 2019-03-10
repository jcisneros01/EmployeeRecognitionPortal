import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ isAuthenticated, location, component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        !isAuthenticated ? <Component {...props} /> : <Redirect to={location.state ? location.state.from : '/dashboard' } /> }/>
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}


export default GuestRoute;