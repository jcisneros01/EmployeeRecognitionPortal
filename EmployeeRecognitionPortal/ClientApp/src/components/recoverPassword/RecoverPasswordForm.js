import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { Button, Form, Message, Card } from 'semantic-ui-react';
import InlineError from '../shared/InlineError';

class RecoverPasswordForm extends React.Component {
    state = {
        data: {
            email: ''
        },
        errors: {}
    }

    onChange = e =>
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    
    validate = data => {
        const errors = {}
        if (!validator.isEmail(data.email)) errors.email = "Invalid email";
        return errors;
    }    

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data.email);
        }
    }    

    render() {
        const { errors, data} = this.state;
        const { loading, apiError } = this.props
        return (
            <Card>
                <Card.Content>
                    <Card.Header>Forgot your password? </Card.Header>
                    <Card.Meta>
                        <span>We'll sent you a email with instructions.</span>
                    </Card.Meta>
                    <Form onSubmit={this.onSubmit} loading={loading}>
                        {!!apiError && <Message negative>{ apiError }</Message>}
                        <Form.Field error={!!errors.email}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                placeholder="Enter your registered email"
                                onChange={this.onChange}
                            />
                            { errors.email && <InlineError text={errors.email}/>}
                        </Form.Field>
                        <Button primary fluid>Reset</Button>
                    </Form>
                    <Link to="/login">Back to login</Link>
                </Card.Content>
            </Card>
        );
    }
}

RecoverPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default RecoverPasswordForm;
