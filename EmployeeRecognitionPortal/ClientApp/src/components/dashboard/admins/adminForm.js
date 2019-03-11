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
        marginRight: "20px",
        width: "30%"
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
        if(this.props.buttonTitle === "Update") {
            this.props.adminContainer.getAdmin(this.props.match.params.id)
        }
    }

    componentWillUnmount() {
        this.props.adminContainer.initializeForm();
    }
    componentWillReceiveProps(newProps) {
         console.log(newProps)
        if(!!newProps.admin) {
            this.setState({
                data: {
                    ...this.state.data,
                    email: newProps.admin.email
                }
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

    onSubmit = (e) => {
        e.preventDefault()
       
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            if(this.props.buttonTitle === "Update") {
                this.props.adminContainer.updateAdmin(this.props.match.params.id, this.state.data);
            } else{
                this.props.adminContainer.createAdmin(this.state.data);
            }
            
        }
    }    
    
    goBack = () => {
        this.props.history.goBack()
    }
   
    render() {
        
        const { data, errors } = this.state;
        console.log(data);
        const {buttonTitle, adminContainer, classes} = this.props
        const { error, admin } = adminContainer.state
        console.log(admin)

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
                        value={data.password} 
                        placeholder="secret"
                        onChange={this.onChange}
                    />     
                    { errors.password && <InlineError text={errors.password}/>}
                </FormControl>
                <Button type="submit"
                    width="50%"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >{buttonTitle}</Button>    
                <Button
                    width="50%"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.goBack}
                >Cancel</Button>  
            </form>
           
                
        </>);
    }
}


AdminForm.propTypes = {
  adminContainer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}






export default withStyles(styles)(AdminForm);