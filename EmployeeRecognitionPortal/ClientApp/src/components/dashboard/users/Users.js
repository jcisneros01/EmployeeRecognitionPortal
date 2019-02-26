import React from 'react'
import { Icon, Table, Button} from 'semantic-ui-react'

import  UserList from './userList';
import UserModal from './userModal';
import UserForm from './userForm';
import ConfirmModal from '../common/confirmModal';

export default class Users extends React.Component {
    state = {
        showUserModal: false,
        formModalShow: false,
        confirmModal: false,
        formType: '',
        user: {}
    }

    componentDidMount() {
        this.props.users.getUsers();
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

   

    render() {
        const {users, loading, error, updateSuccess} = this.props.users.state;
        const { user, showUserModal,formModalShow, formType, confirmModal } = this.state;
       
        return (
            <>
                <UserModal show={showUserModal} hideModal={this.hideModal} user={user}/>
                {formModalShow && 
                    <UserForm 
                        show={formModalShow} 
                        hideFormModal={this.hideFormModal} 
                        user={user} 
                        formType={formType} 
                        initializeForm={this.props.users.initializeForm}
                        updateUser={this.props.users.updateUser}
                        loading={loading}
                        error={error}
                        updateSuccess={updateSuccess}
                        createUser={this.props.users.createUser}
                    />
                }
                {confirmModal && 
                    <ConfirmModal 
                        hideConfirmFormModal={this.hideConfirmFormModal} 
                        collection={user} 
                        deleteRecord={this.props.users.deleteUser}
                        initializeForm={this.props.users.initializeForm}
                        updateSuccess={updateSuccess}
                    />
                }
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
                        {users.length > 0 ? 
                            <UserList 
                            users={users} 
                            showModal={this.showModal} 
                            showFormModal={this.showFormModal}
                            showConfirmModal={this.showConfirmModal}
                            /> :
                            <Table.Row >
                                <Table.Cell>No record found</Table.Cell>
                            </Table.Row>
                        }
                        
                    </Table.Body>

                </Table>
            </>
        )
    }
}