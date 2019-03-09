import React from 'react';
import { withStyles, Paper, Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Subscribe } from 'unstated';
import Layout from '../../../routes/layout'
import  Users from './Users';
import UserContainer from '../../../containers/UserContainer';


const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    margin: {
        margin: theme.spacing.unit,
    }
  }); 

 function DashboardUsersPage({location, classes}) { 

        return (
            <Subscribe to={[UserContainer]}>
                {users => {
                    return <Layout path={location.pathname}>
                     <Paper className={classes.root}>
                        <Typography component="h2" variant="h4">
                                User List
                        </Typography>
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="Add"
                            className={classes.margin}
                        >
                            <AddIcon  />
                            Add User
                        </Fab>
                        {!users.state.success && users.state.error ? (
                            <Typography color="error" component="h4">
                                {users.state.error}
                            </Typography>) : 
                            <Users users={users}/>
                        }
                    </Paper>
                    </Layout>
                }}
                
            </Subscribe>
        );
    
}

export default withStyles(styles)(DashboardUsersPage);

