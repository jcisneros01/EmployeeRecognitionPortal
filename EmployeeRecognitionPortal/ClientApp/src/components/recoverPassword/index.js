import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, CssBaseline,  Typography} from '@material-ui/core';
import { Subscribe } from 'unstated';

import RecoverPasswordContainer from '../../containers/RecoverPasswordContainer';
import RecoverPasswordForm from './RecoverPasswordForm';

const styles = theme => ({
   
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
  });

function RecoverPasswordPage(props) {
    const { classes } = props;
        return (
            <Subscribe to={[RecoverPasswordContainer]}>
                {recoverPassword => {
                    return(
                        <main className={classes.main}>
                            <CssBaseline />
                            <Paper className={classes.paper}>
                                { recoverPassword.state.success ? (
                                    <Typography component="h1" variant="h3">
                                        Email has been sent.
                                    </Typography>  
                                    
                                ) : (
                                    <RecoverPasswordForm submit={ recoverPassword.doRecoverPassword } loading={recoverPassword.state.loading} apiError={recoverPassword.state.error}/>
                                )}
                            </Paper>
                        </main>
                    ) 
                }}
            </Subscribe>
        );
}

RecoverPasswordPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RecoverPasswordPage);


