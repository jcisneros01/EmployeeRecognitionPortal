import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, Input, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import validator from 'validator';
import InlineError from '../shared/InlineError';

const styles = theme => ({
   
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

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
       
    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
          
            this.props.requestLogin(this.state.data)
        }
    }     
   

    render() {
        
        const {  errors, data } = this.state;
        const { classes } = this.props;
        return(
        
                    <form onSubmit={this.onSubmit} className={classes.form} autoComplete="off">
                        { this.props.apiError && <Typography color="error" component="h4">
                            {this.props.apiError}
                        </Typography>}
                        
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                autoComplete="email" 
                                autoFocus
                                value={data.email} 
                                onChange={this.onChange}
                                // error={!!errors.email}
                                />
                           
                            { errors.email && <InlineError text={errors.email}/>}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input 
                                name="password" 
                                type="password" 
                                id="password" 
                                autoComplete="current-password" 
                                value={data.password}
                                onChange={this.onChange}
                                // error={!!errors.password}
                            />
                            { errors.password && <InlineError text={errors.password}/>}
                        </FormControl>

                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                >Login</Button>
                <br/> <br/>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </form>
                   
        
        );
    }
}

LoginForm.propTypes = {
    requestLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    apiError: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm);