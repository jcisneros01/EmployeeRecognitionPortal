import React from 'react';
import { Segment, Grid} from 'semantic-ui-react';
import { Subscribe } from 'unstated';

import ReportContainer from '../../containers/ReportContainer';
import PieChart from "./PieChart";
import LineChart from './LineChart';

const DashboardPage = () => 
   <Subscribe to={[ReportContainer]}>
      {reports => {
         return <Segment>
               <Grid columns={2} padded>
                  <Grid.Column>
                     <PieChart reports={reports}/>
                  </Grid.Column>
                  <Grid.Column>
                     <LineChart reports={reports}/>
                  </Grid.Column>
               </Grid>
            </Segment>
      }}
   </Subscribe>
      
    
export default DashboardPage;    