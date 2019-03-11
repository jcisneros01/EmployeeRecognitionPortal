import React from 'react';
import {Typography, withStyles, Paper} from '@material-ui/core';
import { Subscribe } from 'unstated';

import Layout from '../../routes/layout'
import ReportContainer from '../../containers/ReportContainer';
import PieChart from "./PieChart";
import LineChart from './LineChart';

const styles = theme => ({
   chartContainer: {
     marginLeft: -22,
   },
   paper: {
       padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
       marginBottom: "20px",
       marginLeft: "10px",
       width: "49%",
       float: "left",
       height:"70%"
    },
 });

const DashboardPage = ({classes, location}) => 
   <Subscribe to={[ReportContainer]}>
      {reports => {
         return(<Layout path="Dashboard">
         <Paper className={classes.paper}>
            <h2>
               Awards
            </h2>
               <LineChart reports={reports}/>
         </Paper>
         <Paper className={classes.paper}>
            <PieChart reports={reports}/>
         </Paper>
         </Layout>)
      }}
   </Subscribe>
      
    
export default withStyles(styles)(DashboardPage);    