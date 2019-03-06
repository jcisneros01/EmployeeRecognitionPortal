import React from 'react';
import { Segment, Header, Message } from 'semantic-ui-react'
import { Subscribe } from 'unstated';
import Layout from '../../../routes/layout'
import  Users from './Users';
import UserContainer from '../../../containers/UserContainer';

export default function DashboardUsersPage() { 

        return (
            <Subscribe to={[UserContainer]}>
                {users => {
                    return <Layout>
                    
                        <Header as='h1'>User List</Header>
                        {!users.state.success && users.state.error ? (
                            <Message negative>
                                <p>{users.state.error}</p>
                            </Message>) : 
                            <Users users={users}/>
                        }
                        
                    </Layout>
                }}
                
            </Subscribe>
        );
    
}

