import React from 'react';
import { Message, Grid } from 'semantic-ui-react';
import { Subscribe } from 'unstated';

import RecoverPasswordContainer from '../../containers/RecoverPasswordContainer';
import RecoverPasswordForm from './RecoverPasswordForm';


export default function RecoverPasswordPage() {
  
        return (
            <Subscribe to={[RecoverPasswordContainer]}>
                {recoverPassword => {
                    return <Grid centered columns={4} verticalAlign="middle" style={{height: '100vh'}}>
                        <Grid.Column>
                            { recoverPassword.state.success ? (
                                <Message>Email has been sent.</Message>
                            ) : (
                                <RecoverPasswordForm submit={ recoverPassword.doRecoverPassword } loading={recoverPassword.state.loading} apiError={recoverPassword.state.error}/>
                            )}
                        </Grid.Column>
                    </Grid>
                }}
            </Subscribe>
        );
}


