import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import RecoverPasswordForm from './RecoverPasswordForm';
import { resetPasswordRequest } from '../../actions/authentication';

class RecoverPasswordPage extends React.Component {
  
    submit = data => 
        this.props.resetPasswordRequest(data)


    render() {
        const { success, loading, error } = this.props.auth
        return (
            <Grid centered columns={4} verticalAlign="middle" style={{height: '100vh'}}>
                <Grid.Column>
                    { success ? (
                        <Message>Email has been sent.</Message>
                    ) : (
                        <RecoverPasswordForm submit={ this.submit } loading={loading} apiError={error}/>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
}

RecoverPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
  };

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        resetPasswordRequest
    }, dispatch);
  };


export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordPage);
