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

 class DashboardUsersPage extends React.Component { 

    handleClick = () => {
        this.props.history.push('/dashboard/users/new')
    }

     render(){
         const {classes,  history} = this.props
         return (
            <Subscribe to={[UserContainer]}>
                {users => {
                    return <Layout path="Users">
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
                            onClick={this.handleClick}
                        >
                            <AddIcon  />
                            Add User
                        </Fab>
                        {!users.state.success && users.state.error ? (
                            <Typography color="error" component="h4">
                                {users.state.error}
                            </Typography>) : 
                            <Users users={users} history={history}/>
                        }
                    </Paper>
                    </Layout>
                }}
                
            </Subscribe>
        );
     }

       
    
}

export default withStyles(styles)(DashboardUsersPage);

