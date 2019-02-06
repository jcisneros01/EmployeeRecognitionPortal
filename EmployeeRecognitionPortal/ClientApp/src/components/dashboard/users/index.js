import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Menu, Table, Segment, Button, Header, Message } from 'semantic-ui-react'

import { getUsers, deleteUser } from '../../../actions/users';

import  UserList from './userList';
import UserModal from './userModal';
import UserForm from './userForm';
import ConfirmModal from '../common/confirmModal';
class DashboardUsersPage extends React.Component { 
    state = {
        showUserModal: false,
        formModalShow: false,
        confirmModal: false,
        formType: '',
        user: {}
    }
    componentWillMount() {
        this.props.getUsers();
    }

    showModal = (user) => {
        this.setState({ showUserModal: true, user})
    }

    hideModal = () => {
        this.setState({ showUserModal: false, user: {}})
    }

    showFormModal = (user = {}, formType = "new") => {
       
        this.setState({ formModalShow: true, formType, user})
    }

    hideFormModal = () => {
        this.setState({ formModalShow: false, user: {}, title: ''})
    }

    showConfirmModal = (user) => {
        
        this.setState({ confirmModal: true, user})
    }

    hideConfirmFormModal = () => {
        this.setState({ confirmModal: false, user: {}})
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }

    render () {
        const { users, error } = this.props.user
        const { user, showUserModal,formModalShow, formType, confirmModal } = this.state;
        return (
        <Segment>
            <UserModal show={showUserModal} hideModal={this.hideModal} user={user}/>
            {formModalShow && <UserForm show={formModalShow} hideFormModal={this.hideFormModal} user={user} formType={formType}/>}
            {confirmModal && <ConfirmModal hideConfirmFormModal={this.hideConfirmFormModal} collection={user} deleteRecord={this.deleteUser}/>}
                <Header as='h1'>User List</Header>
                {error ? (
                    <Message negative>
                        <Message.Header>Somthing went wrong</Message.Header>
                        <p>{error}</p>
                    </Message>) : 
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button icon labelPosition='left' primary size='small' onClick={() => this.showFormModal()}>
                                    <Icon name='user' /> Add User
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <UserList 
                            users={users} 
                            showModal={this.showModal} 
                            showFormModal={this.showFormModal}
                            showConfirmModal={this.showConfirmModal}
                            />
                    </Table.Body>

                
            </Table>
                }
                
        </Segment>
        );
    }
    
}

DashboardUsersPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        success: PropTypes.bool.isRequired,
        users: PropTypes.array.isRequired,
    }).isRequired,
    deleteUser: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUsers,
        deleteUser
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

    
export default connect(mapStateToProps, mapDispatchToProps)(DashboardUsersPage);    