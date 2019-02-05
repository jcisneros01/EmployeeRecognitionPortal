import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import { login, logginIn } from '../../actions/authentication';

class LoginPage extends React.Component {

    componentWillReceiveProps(newProps) {
        if(newProps.auth.success) {
            this.props.history.push('/dashboard')
        }
    }

    submit = data => 
        this.props.login(data)
        
    render() {
     
        return (
            <Grid centered verticalAlign="middle"  stretched columns={4} style={{height: "100vh"}}>
                <Grid.Column>
                    <h1>Customer Portal</h1>
                    <LoginForm 
                        submit={this.submit} 
                        logginIn={this.props.logginIn} 
                        loading={this.props.auth.loading}
                        apiError={this.props.auth.error}
                        />
                </Grid.Column>
            </Grid>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired,
    logginIn: PropTypes.func.isRequired,
    auth: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string
    }).isRequired,
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
  };

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login,
        logginIn
    }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);    