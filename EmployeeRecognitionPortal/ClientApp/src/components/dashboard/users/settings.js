import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../../../routes/layout';
import SettingsForm from './settingsForm'
import AdminContainer from '../../../containers/AdminContainer';

const styles = theme => ({
    root: {
      width: '60%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  }); 

class Settings extends React.Component {  
   
    render() {    
        const {classes, history } = this.props
       
        return (
            <Subscribe to={[AdminContainer]}>
                {adminContainer => {
                    if (adminContainer.state.updateSuccess) {
                        this.props.history.push('/dashboard/admins')
                    }
                    return (<Layout path="Settings">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                Manage your Account
                            </Typography>
                            <SettingsForm 
                                adminContainer={adminContainer} 
                                buttonTitle="Save"
                                history={history}
                            />
                        </Paper>
                    
                    </Layout>)}}
            </Subscribe>
        )
    }
}


Settings.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Settings);