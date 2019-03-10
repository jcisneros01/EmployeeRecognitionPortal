import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRoute = ({ isAuthenticated, component: Component, location, ...rest }) => {
    return <Route {...rest} component={props => isAuthenticated ? <Component {...props} /> : <Redirect to={{
        pathname: "/",
        state: {from: location.pathname}
    }} />} />
};

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}


export default UserRoute;