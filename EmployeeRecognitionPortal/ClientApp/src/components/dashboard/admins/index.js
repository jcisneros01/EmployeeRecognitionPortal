import React from 'react';
import { Subscribe } from 'unstated';
import { withStyles, Paper, Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Layout from '../../../routes/layout'
import  Admins from './Admins';
import AdminContainer from '../../../containers/AdminContainer';

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
  }); 


class DashboardAdminsPage extends React.Component { 
    handleClick = () => {
        this.props.history.push('/dashboard/admins/new')
    }

    render() {   
        const {classes, history} = this.props
        return (
            <Subscribe to={[AdminContainer]}>
                {admins => {
                    return <Layout path="Admins">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                Admin List
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
                            Add Admin
                        </Fab>
                        {!admins.state.success && admins.state.error ? (
                            <Typography color="error" component="h4">
                                {admins.state.error}
                            </Typography>) : 
                            <Admins admins={admins} history={history}/>
                        }
                        
                        </Paper>
                        </Layout>
                }}
                
            </Subscribe>
        );
    }
    
}
export default withStyles(styles)(DashboardAdminsPage);

