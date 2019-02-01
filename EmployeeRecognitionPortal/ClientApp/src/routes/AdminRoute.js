import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated ? <Component {...props}/> : <Redirect to="/" /> }/>
);

AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(AdminRoute);