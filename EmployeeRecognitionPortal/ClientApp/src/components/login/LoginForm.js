import React from 'react';
import { Button, Form, Message, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import InlineError from '../shared/InlineError';

class LoginForm extends React.Component {

    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    validate = (data) => {
        const errors = {};
        if (!validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Password can't be blank";
        return errors;
    }
    onChange = e => 
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
            })
       
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props.logginIn();
            this.props.submit(this.state.data)
        }
    }     
   

    render() {
        
        const {  errors, data } = this.state;
        return(
            <Card>
                <Card.Content>
                    <Card.Header>Welcome Back !</Card.Header>
                    <Card.Meta>
                        <span >Sign in to continue</span>
                    </Card.Meta>
                    <Form onSubmit={this.onSubmit} loading={this.props.loading}>
                        { this.props.apiError && <Message negative> 
                            <Message.Header>Somthing went wrong</Message.Header>
                            <p>{this.props.apiError}</p>
                            </Message>
                        }
                        <Form.Field error={!!errors.email}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="example@example.com"
                                value={data.email}
                                onChange={this.onChange}
                                /> 
                                { errors.email && <InlineError text={errors.email}/>}
                        </Form.Field>
                        <Form.Field error={!!errors.password}>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="password"
                                value={data.password}
                                onChange={this.onChange}
                                /> 
                                { errors.password && <InlineError text={errors.password}/>}
                        </Form.Field>
                        <Button primary fluid>Login</Button>
               
                    </Form>
                    <Link to="/forgot-password">Forgot password?</Link>
            </Card.Content>
        </Card>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
    logginIn: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    apiError: PropTypes.string
}

export default LoginForm;