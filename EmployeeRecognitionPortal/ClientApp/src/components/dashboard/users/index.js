import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import { Segment, Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';
import Layout from '../../../routes/layout'
import  Users from './Users';
import UserContainer from '../../../containers/UserContainer';


const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  }); 

 function DashboardUsersPage({location, classes}) { 

        return (
            <Subscribe to={[UserContainer]}>
                {users => {
                    return <Layout path={location.pathname}>
                     <Paper className={classes.root}>
                        <Header as='h1'>User List</Header>
                        {!users.state.success && users.state.error ? (
                            <Message negative>
                                <p>{users.state.error}</p>
                            </Message>) : 
                            <Users users={users}/>
                        }
                    </Paper>
                    </Layout>
                }}
                
            </Subscribe>
        );
    
}

export default withStyles(styles)(DashboardUsersPage);

