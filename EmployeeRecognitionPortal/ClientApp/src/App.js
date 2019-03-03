import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles } from '@material-ui/core/styles';

import AuthHeaderBar from './components/shared/AuthHeaderBar';
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
import Layout from './routes/layout'
const styles = () => ({
  root: {
    flexGrow: 1,
  }

});

const App = ({ location, classes}) => (
  <Subscribe to={[LoginContainer]}>
   {login => {
  
    return <div className={classes.root}>
        {!login.state.token && 
          <AuthHeaderBar/>
        }

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
       
        <Layout location={location} isAuthenticated={!!login.state.success}>
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
        </Layout>
       


      </div>
   }}
    
  </Subscribe>
  
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(App);
