import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import { withStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../../../routes/layout';
import AwardForm from './awardForm'
import AwardContainer from '../../../containers/AwardContainer';

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
  }); 

class EditAward extends React.Component {  
   
    render() {    
        const {classes, history, match } = this.props
       
        return (
            <Subscribe to={[AwardContainer]}>
                {awardContainer => {
                    if (awardContainer.state.updateSuccess) {
                        this.props.history.push(`/dashboard/awards/${match.params.name}`)
                    }
                    return (<Layout path="Awards">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                EditAward
                            </Typography>
                            <AwardForm 
                                awardContainer={awardContainer} 
                                buttonTitle="Save"
                                history={history}
                            />
                        </Paper>
                    
                    </Layout>)}}
            </Subscribe>
        )
    }
}


EditAward.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(EditAward);