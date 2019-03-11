import React from 'react';
import { withStyles, Paper, Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Subscribe } from 'unstated';

import Layout from '../../../../routes/layout'
import Awards from '../Awards';
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

class AwardsEOMPage extends React.Component {
    handleClick = () => {
        this.props.history.push('/dashboard/awards/new/eom')
    }
    render() {
        const { classes, history } = this.props
        return (
            <Subscribe to={[AwardContainer]}>
                {awards => {
                    return <Layout path="Employee of Month">
                        <Paper className={classes.root}>
                            <Typography component="h2" variant="h4">
                                Awards EOM List
                            </Typography>
                            <Fab
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Add"
                                className={classes.margin}
                                onClick={this.handleClick}
                            >
                                <AddIcon />
                                Add Awards
                            </Fab>
                            {!awards.state.success && awards.state.error ? (
                                <Typography color="error" component="h4">
                                    {awards.state.error}
                                </Typography>
                            ) :
                                <Awards awards={awards} title="EOM" history={history} />
                            }
                        </Paper>
                    </Layout>
                }}

            </Subscribe>
        );
    }
}

export default withStyles(styles)(AwardsEOMPage);

