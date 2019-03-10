import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, Input, Typography} from '@material-ui/core';

import validator from 'validator';

import InlineError from '../../shared/InlineError';

const styles = theme => ({
   
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class AdminForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    componentWillMount() {
        this.props.adminContainer.initializeForm();
        // if(Object.keys(this.props.adminContainer.admin).length > 0) {
        //     this.setState({
        //         data: {...this.props.admin}
        //     })
        // } 
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

    onSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            if(this.props.buttonTitle === "update") {
                this.props.adminContainer.updateAdmin(this.state.data);
            } else{
                this.props.adminContainer.createAdmin(this.state.data);
            }
            
        }
    }    
    
    goBack = () => {
        this.props.goBack()
    }
   
    render() {
        
        const { data, errors } = this.state;
        const {buttonTitle, adminContainer, classes} = this.props
        const { error } = adminContainer.state

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
                            
                <FormControl margin="normal" required fullWidth error={!!errors.password}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        id="password" 
                        name="password" 
                        type="password"
                        autoComplete="password" 
                        value={data.password} 
                        placeholder="secret"
                        onChange={this.onChange}
                    />     
                    { errors.password && <InlineError text={errors.password}/>}
                </FormControl>
                <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >{buttonTitle}</Button>              
            </form>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.goBack}
            >Go Back</Button>  
                
        </>);
    }
}


AdminForm.propTypes = {
  adminContainer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}






export default withStyles(styles)(AdminForm);