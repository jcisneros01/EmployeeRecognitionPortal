import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container} from 'semantic-ui-react';

import Navigator from './Navigation';
import * as routes from './constants/routes';
import GuestRoute from './routes/GuestRoute';
import AdminRoute from './routes/AdminRoute';
import HomePage from './components/home';
import LoginPage from './components/login';
import RecoverPasswordPage from './components/recoverPassword';
import DashboardPage from './components/dashboard';
import DashboardUsersPage from './components/dashboard/users';


const App = ({ location, isAuthenticated }) => (
  <Container fluid>
      {isAuthenticated && <Navigator/>}

      <GuestRoute
        location={location}
        exact path={routes.ROOT}
        component={LoginPage}
      />

      <GuestRoute
        location={location}
        exact path={routes.SIGN_IN}
        component={LoginPage}
      />
  
      <GuestRoute
        location={location}
        exact path={routes.RECOVER_PASSWORD}
        component={RecoverPasswordPage}
      />

      <AdminRoute
        location={location}
        exact path={routes.DASHBOARD}
        component={DashboardPage}
      />
      <AdminRoute
        location={location}
        exact path={`${routes.DASHBOARD}/${routes.USERS}`}
        component={DashboardUsersPage}
      />


    </Container>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
 
  return {
      isAuthenticated: !!state.auth.token
  }
}  


export default connect(mapStateToProps, null)(App);
