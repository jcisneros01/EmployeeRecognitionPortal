import React from 'react';
import { withStyles, Paper, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {  Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';

import Layout from '../../../../routes/layout'
import  Awards from '../Awards';
import AwardContainer from '../../../../containers/AwardContainer';

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

function AwardsEOMPage({location, classes}) { 

        return (
            <Subscribe to={[AwardContainer]}>
                {awards => {
                    return <Layout path={location.pathname}>
                        <Paper className={classes.root}>
                        <Header as='h1'>Awards EOM List</Header>
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="Add"
                            className={classes.margin}
                        >
                            <AddIcon  />
                            Add Awards
                        </Fab>
                        {!awards.state.success && awards.state.error ? (
                            <Message negative>
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{awards.state.error}</p>
                            </Message>) : 
                            <Awards awards={awards} title="EOM"/>
                        }
                        </Paper>
                    </Layout>
                }}
                
            </Subscribe>
        );
    
}

export default withStyles(styles)(AwardsEOMPage);

