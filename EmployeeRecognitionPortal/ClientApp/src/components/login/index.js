import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles } from '@material-ui/core/styles';
import {Paper, CssBaseline, Avatar, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginForm from './LoginForm';
import LoginContainer from '../../containers/LoginContainer'

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

function LoginPage (props) {
    const { classes } = props;
   
    return (
        <Subscribe to={[LoginContainer]}>
            {login => {
                if(login.state.success) {
                    this.props.history.push('/dashboard')
                }
                
                return(<main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                                     
                        <LoginForm  
                            requestLogin={login.requestLogin} 
                            loading={login.state.loading}
                            apiError={login.state.error}
                        />
                        
                    </Paper>
                </main>)
            }}
        </Subscribe>
        
    );
    
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginPage);

  