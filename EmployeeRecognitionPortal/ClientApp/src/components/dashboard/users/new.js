import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../../../routes/layout';
import UserForm from './userForm'
import UserContainer from '../../../containers/UserContainer';

const styles = theme => ({
    root: {
      width: '60%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  }); 

class NewUser extends React.Component {  
   
    render() {    
        const {classes, history } = this.props
       
        return (
            <Subscribe to={[UserContainer]}>
                {userContainer => {
                    if (userContainer.state.updateSuccess) {
                        this.props.history.push('/dashboard/users')
                    }
                    return (<Layout path="Users">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                Add User
                            </Typography>
                            <UserForm 
                                userContainer={userContainer} 
                                buttonTitle="Save"
                                history={history}
                            />
                        </Paper>
                    
                    </Layout>)}}
            </Subscribe>
        )
    }
}


NewUser.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(NewUser);