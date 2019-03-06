import React from 'react';
import { Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';
import { withStyles, Paper } from '@material-ui/core';

import Layout from '../../../routes/layout'
import  Admins from './Admins';
import AdminContainer from '../../../containers/AdminContainer';

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  });

function DashboardAdminsPage({classes}) { 

        return (
            <Subscribe to={[AdminContainer]}>
                {admins => {
                    return <Layout>
                            <Paper className={classes.root}>
                    
                        <Header as='h1'>Admin List</Header>
                        {!admins.state.success && admins.state.error ? (
                            <Message negative>
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{admins.state.error}</p>
                            </Message>) : 
                            <Admins admins={admins}/>
                        }
                        
                        </Paper>
                        </Layout>
                }}
                
            </Subscribe>
        );
    
}
export default withStyles(styles)(DashboardAdminsPage);

