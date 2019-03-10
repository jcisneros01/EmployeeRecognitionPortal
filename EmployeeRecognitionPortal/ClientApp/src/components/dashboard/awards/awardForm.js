import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputLabel, Input, Typography, withStyles} from '@material-ui/core';
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

class AwardForm extends React.Component {
    state = {
        data: {
            employeeName: "",
            employeeEmail: "",
            dateAwarded: ""
        },
        errors: {}
    }

    componentWillUnmount() {
        this.props.awardContainer.initializeForm();
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

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            if(this.props.match.params.name === "eom") {
                this.props.awardContainer.createEOM(this.state.data); 
            } else {
                this.props.awardContainer.createEOY(this.state.data); 
            }
                       
        }
    }     

    goBack = () => {
        this.props.history.goBack()
    }


    render() {
        
        const { data, errors } = this.state;
        const { awardContainer, classes } = this.props
        const { error } = awardContainer.state

        return(
            <form onSubmit={this.onSubmit} className={classes.form} autoComplete="off">
                { error && <Typography color="error" component="h4">
                    {error}
                </Typography>}
                <FormControl margin="normal" required fullWidth error={!!errors.employeeEmail}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input 
                        id="employeeEmail" 
                        name="employeeEmail" 
                        type="email"
                        autoComplete="employeeEmail" 
                        autoFocus
                        value={data.employeeEmail} 
                        placeholder="example@example.com"
                        onChange={this.onChange}
                    />
                               
                    { errors.employeeEmail && <InlineError text={errors.employeeEmail}/>}
                </FormControl>
                <FormControl margin="normal" required fullWidth error={!!errors.employeeName}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input 
                        id="employeeName" 
                        name="employeeName" 
                        type="text"
                        autoComplete="employeeName" 
                        autoFocus
                        value={data.employeeName} 
                        placeholder="John Doe"
                        onChange={this.onChange}
                    />
                               
                    { errors.employeeName && <InlineError text={errors.employeeName}/>}
                </FormControl>
                <FormControl margin="normal" required fullWidth error={!!errors.dateAwarded}>
                    <InputLabel htmlFor="dateAwarded">Date Awarded</InputLabel>
                    <Input 
                        id="dateAwarded" 
                        name="dateAwarded" 
                        type="date"
                        autoComplete="dateAwarded" 
                        autoFocus
                        value={data.dateAwarded} 
                        placeholder="Date Awarded"
                        onChange={this.onChange}
                    />
                               
                    { errors.dateAwarded && <InlineError text={errors.dateAwarded}/>}
                </FormControl>
                            
                <Button type="submit"
                    width="50%"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Create Award</Button>    
                <Button
                    width="50%"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.goBack}
                >Go Back</Button>               
        </form>
        );
    }
}


AwardForm.propTypes = {
    classes: PropTypes.object.isRequired

}

export default withStyles(styles)(AwardForm);