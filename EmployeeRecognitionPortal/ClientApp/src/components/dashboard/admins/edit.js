import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../../../routes/layout';
import AdminForm from './adminForm'
import AdminContainer from '../../../containers/AdminContainer';

const styles = theme => ({
    root: {
      width: '60%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  }); 

class EditAdmin extends React.Component {  
   
    render() {    
        const {classes, history, match } = this.props
       
        return (
            <Subscribe to={[AdminContainer]}>
                {adminContainer => {
                    if (adminContainer.state.updateSuccess) {
                        this.props.history.push('/dashboard/admins')
                    }
                    
                    return (<Layout path="Admins">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                Edit Admin 
                            </Typography>
                            
                                <AdminForm 
                                    adminContainer={adminContainer}
                                    buttonTitle="Update"
                                    history={history}
                                    admin={adminContainer.state.admin}
                                    match={match}
                                />
                            
                        </Paper>
                    
                    </Layout>)}}
            </Subscribe>
        )
    }
}


EditAdmin.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(EditAdmin);