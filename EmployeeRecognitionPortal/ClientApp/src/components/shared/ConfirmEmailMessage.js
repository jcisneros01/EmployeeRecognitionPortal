import React from 'react';
import { Message } from 'semantic-ui-react';

const ConfirmEmailMessage = () => (
    <Message info>
        <Message.Header>
            Please verify your email to unlock dashboard
        </Message.Header> 
    </Message>
);

export default ConfirmEmailMessage;
