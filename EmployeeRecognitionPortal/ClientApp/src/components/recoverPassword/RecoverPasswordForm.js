import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { Button, FormControl, InputLabel, Input, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        const {  apiError, classes } = this.props
        return (
            <form onSubmit={this.onSubmit} className={classes.form} autoComplete="off">
                
                <Typography component="h1" variant="h4">
                    Forgot your password?
                </Typography> 
                <br/>
                <Typography component="h1">
                    We'll sent you a email with instructions.
                </Typography> 
                {!!apiError && <p>{ apiError }</p>}
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input 
                        id="email" 
                        name="email" 
                        autoComplete="email" 
                        autoFocus
                        value={data.email} 
                        placeholder="Enter your registered email"
                        onChange={this.onChange}
                        // error={!!errors.email}
                    />
                           
                    { errors.email && <InlineError text={errors.email}/>}
                </FormControl>
                <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Reset</Button>
                <br/> <br/>
                <Link to="/login">Back to login</Link>
            </form>
           
             
        );
    }
}

RecoverPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RecoverPasswordForm);
