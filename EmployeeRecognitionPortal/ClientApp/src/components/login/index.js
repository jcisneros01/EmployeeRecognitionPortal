import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { Subscribe } from 'unstated';

import LoginForm from './LoginForm';
import LoginContainer from '../../containers/LoginContainer'

export default function LoginPage () {
     
        return (
            <Subscribe to={[LoginContainer]}>
                {login => {
                    if(login.state.success) {
                        this.props.history.push('/dashboard')
                    }
                   
                    return <Grid centered verticalAlign="middle"  stretched columns={4} style={{height: "100vh"}}>
                     <Grid.Column>
                         <h1>Customer Portal</h1>
                         <LoginForm  
                             requestLogin={login.requestLogin} 
                             loading={login.state.loading}
                             apiError={login.state.error}
                             />
                     </Grid.Column>
                 </Grid>
                }}
            </Subscribe>
           
        );
    
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

  