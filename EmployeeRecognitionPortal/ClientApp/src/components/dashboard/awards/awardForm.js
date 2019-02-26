import React from 'react';
import PropTypes from 'prop-types';
import { Button,  Form, Message, Modal, Grid } from 'semantic-ui-react';
import validator from 'validator';
import InlineError from '../../shared/InlineError';

class AwardForm extends React.Component {
    state = {
        data: {
            employeeName: "",
            employeeEmail: "",
            dateAwarded: "",
            awardCreatorId: 5
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
    }

    validate = (data) => {
        const errors = {};
        if (!validator.isEmail(data.employeeEmail)) errors.employeeEmail = "Invalid email";
        if (!data.employeeName) errors.employeeName = "Name can't be blank";
        if (!data.dateAwarded) errors.dateAwarded = "Date can't be blank";
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
            this.props.createAward(this.state.data);            
        }
    }     


    render() {
        
        const { data, errors } = this.state;
        const { show, hideFormModal, loading, error, title } = this.props
     
        return(
            <Modal open={show}>
                <Modal.Header> Create {title} Award </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            { error && <Message negative> 
                                <Message.Header>Somthing went wrong</Message.Header>
                                <p>{error}</p>
                                </Message>
                            }
                            <Form.Field error={!!errors.employeeEmail}>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="employeeEmail" 
                                    placeholder="example@example.com"
                                    value={data.email}
                                    onChange={this.onChange}
                                    /> 
                                    { errors.employeeEmail && <InlineError text={errors.employeeEmail}/>}
                            </Form.Field>
                            <Form.Field error={!!errors.employeeName}>
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="employeeName" 
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={this.onChange}
                                    /> 
                                    { errors.employeeName && <InlineError text={errors.employeeName}/>}
                            </Form.Field>
                            <Form.Field error={!!errors.password}>
                                <label htmlFor="dateAwarded">Date Awarded</label>
                                <input 
                                    type="date" 
                                    id="dateAwarded" 
                                    name="dateAwarded" 
                                    placeholder="Date Awarded"
                                    value={data.dateAwarded}
                                    onChange={this.onChange}
                                    /> 
                                    { errors.dateAwarded && <InlineError text={errors.dateAwarded}/>}
                            </Form.Field>
                            
                           
                          
                            <Button primary style={{marginTop: 5}}>
                                Create Award
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


AwardForm.propTypes = {
  hideFormModal: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
 
}

export default AwardForm;