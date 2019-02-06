import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button,  Form, Message, Modal, Grid } from 'semantic-ui-react';
import validator from 'validator';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

import InlineError from '../../shared/InlineError';
import {  createUser, updateUser, initializeForm } from '../../../actions/users';
import { thumb, thumbInner, img, baseStyle, activeStyle, rejectStyle} from './styles'

class UserForm extends React.Component {
    state = {
        data: {
            email: "",
            password: "",
            name: "",
            signature: "",
            preview: "",
            isBlob: false,
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
        if(Object.keys(this.props.user).length > 0) {
            this.setState({
                data: {...this.props.user, preview: this.props.user.signature, isBlob: true}
            })
        }
           
    }

    validate = (data) => {
        const errors = {};
        if (!validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.name) errors.name = "Name can't be blank";
        if (!data.password) errors.password = "Password can't be blank";
        if (!data.signature) errors.signature = "Signature can't be blank";
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
            if(this.props.formType == "edit") {
                this.props.updateUser(this.state.data);
            } else{
                this.props.createUser(this.state.data);
            }
            
        }
    }     

    onDrop = (acceptedFiles, rejectedFiles) => {
        let uploadedFile = acceptedFiles[0]
        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = event => {
           this.setState({
               data: {
                   ...this.state.data,
                   signature: event.target.result.split(',').pop(),
                   preview: URL.createObjectURL(uploadedFile),
                   isBlob: false
               }
           })
        };

       
      }
   
    render() {
        
        const { data, errors } = this.state;
    
        const { show, hideFormModal, formType, loading, error, success } = this.props
        const thumbs = data.preview && 
            <div style={thumb}>
              <div style={thumbInner}>
                 
                <img
                  src={data.isBlob ? `data:image/png;base64, ${data.preview}` : data.preview}
                  style={img}
                  alt=""
                />
              </div>
            </div>
        

        return(
            <Modal open={show}>
                <Modal.Header>{formType == "edit" ? "Edit User" : "Create User" }</Modal.Header>
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
                            <Form.Field error={!!errors.name}>
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={this.onChange}
                                    /> 
                                    { errors.name && <InlineError text={errors.name}/>}
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
                            
                            <Grid>
                                <Grid.Column floated='left' width={5}>
                                    <Form.Field error={!!errors.signature}>
                                        <label htmlFor="signature">Signature</label>
                                        <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" multiple={false}>
                                        
                                            {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,}) => {
                                                let styles = {...baseStyle}
                                                styles = isDragActive ? {...styles, ...activeStyle} : styles
                                                styles = isDragReject ? {...styles, ...rejectStyle} : styles
                                            return (
                                                <div
                                                style={styles}
                                                {...getRootProps()}
                                                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                                                >
                                                <input {...getInputProps()} name="signature"/>
                                                <div>
                                            {isDragAccept ? 'Drop' : 'Drag'} file here...
                                            </div>
                                            {isDragReject && <div>Unsupported file type...</div>}
                                                </div>
                                            )
                                            }}
                                        </Dropzone>
                                    </Form.Field>
                                </Grid.Column>
                                { thumbs && 
                                    <Grid.Column floated='right' width={5}>
                                        <p style={{marginBottom: 0}}>Preview</p>
                                        {thumbs}
                                    </Grid.Column>
                                }
                                
                            </Grid>
                          
                            <Button primary style={{marginTop: 5}}>
                                {formType == "edit" ? "Update" : "Create User"}
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


UserForm.propTypes = {
  hideFormModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updateSuccess: PropTypes.bool.isRequired
 
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        updateSuccess: state.user.updateSuccess
    }
  };



const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createUser,
        updateUser,
        initializeForm
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);