import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputLabel, Input, Typography, withStyles} from '@material-ui/core';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'

import validator from 'validator';
import InlineError from '../../shared/InlineError';
import { thumb, thumbInner, img, baseStyle, activeStyle, rejectStyle} from './styles'

const styles = theme => ({ 
   
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginRight: "20px",
        width: "30%"
    },
  });

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

    componentWillMount() {
        if(this.props.buttonTitle === "Update") {
            this.props.userContainer.getUser(this.props.match.params.id)
        }
    }

    componentWillUnmount() {
        this.props.userContainer.initializeForm();
    }
    componentWillReceiveProps(newProps) {
        if(!!newProps.user) {
            this.setState({
                data: {
                    ...this.state.data,
                    email: newProps.user.email,
                    password: newProps.user.password,
                    name: newProps.user.name,
                    signature: newProps.user.signature,
                    preview: newProps.user.signature,
                    isBlob: true

                }
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

    onSubmit = (e) => {
        e.preventDefault()
       
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            if(this.props.buttonTitle === "Update") {
                this.props.userContainer.updateUser(this.props.match.params.id, this.state.data);
            } else{
                this.props.userContainer.createUser(this.state.data);
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
    
    goBack = () => {
        this.props.history.goBack()
    }
   
    render() {
        
        const { data, errors } = this.state;
        const {buttonTitle, userContainer, classes} = this.props
        const { error } = userContainer.state

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

        return(<>
            <form onSubmit={this.onSubmit} className={classes.form} autoComplete="off">
                { error && <Typography color="error" component="h4">
                    {error}
                </Typography>}
                <FormControl margin="normal" required fullWidth error={!!errors.email}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input 
                        id="email" 
                        name="email" 
                        type="email"
                        autoComplete="email" 
                        autoFocus
                        value={data.email} 
                        placeholder="example@example.com"
                        onChange={this.onChange}
                    />
                               
                    { errors.email && <InlineError text={errors.email}/>}
                </FormControl>
                            
                <FormControl margin="normal" required fullWidth error={!!errors.name}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input 
                        id="name" 
                        name="name" 
                        type="name"
                        autoComplete="name" 
                        value={data.name} 
                        placeholder="Name"
                        onChange={this.onChange}
                    />     
                    { errors.name && <InlineError text={errors.name}/>}
                </FormControl>
                <FormControl margin="normal" required fullWidth error={!!errors.password}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        id="password" 
                        name="password" 
                        type="password"
                        autoComplete="password" 
                        value={data.password} 
                        placeholder="password"
                        onChange={this.onChange}
                    />     
                    { errors.signature && <InlineError text={errors.signature}/>}
                </FormControl>
                <FormControl margin="normal" required fullWidth error={!!errors.signature}>
                    <InputLabel htmlFor="signature" >Signature</InputLabel>
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
                    {thumbs}
                </FormControl>
                <Button type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >{buttonTitle}</Button>    
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.goBack}
                >Cancel</Button>  
            </form>
           
                
        </>);
    }
}


UserForm.propTypes = {
  userContainer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(UserForm);