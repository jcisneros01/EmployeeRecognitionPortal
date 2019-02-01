import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        !isAuthenticated ? <Component {...props}/> : <Redirect to="/dashboard" /> }/>
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(GuestRoute);