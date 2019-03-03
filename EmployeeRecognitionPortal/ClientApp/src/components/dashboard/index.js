import React from 'react';
import {Typography, withStyles, Paper} from '@material-ui/core';
import { Subscribe } from 'unstated';

import ReportContainer from '../../containers/ReportContainer';
import PieChart from "./PieChart";
import LineChart from './LineChart';

const styles = theme => ({
   chartContainer: {
     marginLeft: -22,
   },
   paper: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
 });

const DashboardPage = ({classes}) => 
   <Subscribe to={[ReportContainer]}>
      {reports => {
         return(<>
         <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom component="h2">
               Awards
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
               <LineChart reports={reports}/>
            </Typography>
         </Paper>
         <Paper className={classes.paper}>
            <PieChart reports={reports}/>
         </Paper>
         </>)
      }}
   </Subscribe>
      
    
export default withStyles(styles)(DashboardPage);    