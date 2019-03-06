import React from 'react';
import { Segment, Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';

import Layout from '../../../../routes/layout'
import  Awards from '../Awards';
import AwardContainer from '../../../../containers/AwardContainer';

export default function AwardsEOYPage({location}) { 

        return (
            <Subscribe to={[AwardContainer]}>
                {awards => {
                    return <Layout path={location.pathname}>
                    
                        <Header as='h1'>Awards EOY List</Header>
                        {!awards.state.success && awards.state.error ? (
                            <Message negative>
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{awards.state.error}</p>
                            </Message>) : 
                            <Awards awards={awards} title="EOY"/>
                        }
                        
                    </Layout>
                }}
                
            </Subscribe>
        );
    
}

