import React from 'react';
import PropTypes from 'prop-types';
import { Button,  Form, Message, Modal } from 'semantic-ui-react';
import validator from 'validator';

import InlineError from '../../shared/InlineError';


class AdminForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    componentWillReceiveProps(newProps) {
        
        if(newProps.updateSuccess) {
            this.props.hideFormModal()
        } 
       
    }

    componentDidMount() {
        this.props.initializeForm();
        if(Object.keys(this.props.admin).length > 0) {
            this.setState({
                data: {...this.props.admin}
            })
        } 
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
            if(this.props.formType === "edit") {
                this.props.updateAdmin(this.state.data);
            } else{
                this.props.createAdmin(this.state.data);
            }
            
        }
    }     
   
    render() {
        
        const { data, errors } = this.state;
    
        const { show, hideFormModal, formType, loading, error } = this.props

        return(
            <Modal open={show}>
                <Modal.Header>{formType === "edit" ? "Edit Admin" : "Create Admin" }</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            { error && <Message negative> 
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{error}</p>
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
                          
                            <Button primary style={{marginTop: 5}}>
                                {formType === "edit" ? "Update" : "Create Admin"}
                            </Button>               
                        </Form>
                    </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => hideFormModal()}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}


AdminForm.propTypes = {
  hideFormModal: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  initializeForm: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func
}






export default AdminForm;