import React from 'react'
import PropTypes from 'prop-types';
import { Icon,  Button} from 'semantic-ui-react'
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import  UserList from './userList';
import UserModal from './userModal';
import UserForm from './userForm';
import ConfirmModal from '../common/confirmModal';

const styles = {
    table: {
      minWidth: 700,
    },
  };
 class Users extends React.Component {
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
       const {classes} = this.props
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
                <Table className={classes.table}>
                    <TableHead>
                        {/* <TableRow>
                            <Button icon labelPosition='left' primary size='small' onClick={() => this.showFormModal()}>
                                <Icon name='user' /> Add User
                            </Button>
                        </TableRow> */}
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.length > 0 ? 
                            <UserList 
                            users={users} 
                            showModal={this.showModal} 
                            showFormModal={this.showFormModal}
                            showConfirmModal={this.showConfirmModal}
                            /> :
                            <TableRow >
                                <TableCell>No record found</TableCell>
                            </TableRow>
                        }
                        
                    </TableBody>

                </Table>
            </>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Users);