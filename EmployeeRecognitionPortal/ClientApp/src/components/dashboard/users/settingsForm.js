import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Image } from 'semantic-ui-react';

import { Button, FormControl, InputLabel, Input, Typography } from '@material-ui/core';

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

class SettingsForm extends React.Component {
    state = {
        data: {
            name: "",
        },
        errors: {}
    }

    validate = (data) => {
        const errors = {};
        return errors;
    }

    componentWillMount() {
        this.props.userContainer.getUser(localStorage.id);
    }

    componentWillUnmount() {
        this.props.userContainer.initializeForm();
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps,"newprops")
        if (!!newProps.userContainer) {
            this.setState({
                data: {
                    ...this.state.data,
                    name: newProps.userContainer.state.user.name
                }
            })
        }
    }

    onChange = e =>
        this.setState({
        })

    onSubmit = (e) => {
        e.preventDefault()

        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.userContainer.updateUser(localStorage.id, this.props.userContainer.state.user)
        }
    }


    render() {

        const { data, errors } = this.state;
        const { buttonTitle, classes, userContainer } = this.props
        const { user } = userContainer.state
        console.log(userContainer);
        return (

            <>
                <form onSubmit={this.onSubmit} className={classes.form} autoComplete="off">
                    <FormControl margin="normal" required fullWidth >
                        <p><b>Name</b></p>
                        <Input
                            id="name"
                            name="name"
                            type="name"
                            autoFocus
                            value={data.name}
                            onChange={this.onChange}
                        />
                    </FormControl>
                    <p> <b>Email:</b> {user.email}</p>
                    <b>Signature:</b>  <Image src={`data:image/png;base64, ${user.signature}`} rounded size="tiny" />

                    <Button type="submit"
                        width="50%"
                        variant="contained"
                        color="primary"
                    >{buttonTitle}</Button>
                </form>
            </>);
    }
}


SettingsForm.propTypes = {
    userContainer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}






export default withStyles(styles)(SettingsForm);