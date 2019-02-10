import React from 'react';
import { Segment, Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';

import  Admins from './Admins';
import AdminContainer from '../../../containers/AdminContainer';

export default function DashboardAdminsPage() { 

        return (
            <Subscribe to={[AdminContainer]}>
                {admins => {
                    return <Segment>
                    
                        <Header as='h1'>Admin List</Header>
                        {!admins.state.success && admins.state.error ? (
                            <Message negative>
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{admins.state.error}</p>
                            </Message>) : 
                            <Admins admins={admins}/>
                        }
                        
                </Segment>
                }}
                
            </Subscribe>
        );
    
}

