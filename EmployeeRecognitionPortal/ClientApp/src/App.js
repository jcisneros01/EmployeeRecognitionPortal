import React from 'react';
import PropTypes from 'prop-types';
import { Container} from 'semantic-ui-react';
import { Subscribe } from 'unstated';

import Navigator from './Navigation';
import * as routes from './constants/routes';
import GuestRoute from './routes/GuestRoute';
import AdminRoute from './routes/AdminRoute';
import LoginPage from './components/login';
import RecoverPasswordPage from './components/recoverPassword';
import DashboardPage from './components/dashboard';
import DashboardUsersPage from './components/dashboard/users';
import DashboardAdminsPage from './components/dashboard/admins';
import AwardsEOYPage from './components/dashboard/awards/eoy';
import AwardsEOMPage from './components/dashboard/awards/eom';
import LoginContainer from './containers/LoginContainer';

const App = ({ location}) => (
  <Subscribe to={[LoginContainer]}>
   {login => {
  
    return <Container fluid>
        {!!login.state.token && 
          <Navigator 
            isAuthenticated={!!login.state.token}
            isAdmin={login.state.isAdmin}
            logout={login.logout}
            />}

        <GuestRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={routes.ROOT}
          component={LoginPage}
        />

         <GuestRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={routes.SIGN_IN}
          component={LoginPage}
        />
    
        <GuestRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={routes.RECOVER_PASSWORD}
          component={RecoverPasswordPage}
        />

        <AdminRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={routes.DASHBOARD}
          component={DashboardPage}
        />
        <AdminRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={`${routes.DASHBOARD}/${routes.ADMINS}`}
          component={DashboardAdminsPage}
        />
        <AdminRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={`${routes.DASHBOARD}/${routes.USERS}`}
          component={DashboardUsersPage}
        />
        <AdminRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}
          component={AwardsEOMPage}
        />
        <AdminRoute
          isAuthenticated={!!login.state.success}
          location={location}
          exact path={`${routes.DASHBOARD}/${routes.AWARDSEOY}`}
          component={AwardsEOYPage}
        />


      </Container>
   }}
    
  </Subscribe>
  
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}



export default App;
