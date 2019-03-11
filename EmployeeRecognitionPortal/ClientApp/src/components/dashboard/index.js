import React from 'react';
import { Typography, withStyles, Paper } from '@material-ui/core';
import { Subscribe } from 'unstated';

import Layout from '../../routes/layout'
import ReportContainer from '../../containers/ReportContainer';
import PieChart from "./PieChart";
import LineChart from './LineChart';

const styles = theme => ({
    chartContainer: {
        marginLeft: -22,
        width: "50%"
    },
    paper: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

const DashboardPage = ({ classes, location }) =>
    <Subscribe to={[ReportContainer]}>
        {reports => {
            return (<Layout path="Dashboard">
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom component="h2">
                        Awards
            </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        <LineChart reports={reports} />
                    </Typography>
                </Paper>

                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom component="h2">
                        Awards
            </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        <PieChart reports={reports} />

                    </Typography>
                </Paper>
            </Layout>)
        }}
    </Subscribe>


export default withStyles(styles)(DashboardPage);    