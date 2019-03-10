import React from 'react'
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import  UserList from './userList';
import UserModal from './userModal';
import ConfirmModal from '../common/confirmModal';

const styles = {
    table: {
      minWidth: 700,
    },
  };
 class Users extends React.Component {
    state = {
        showUserModal: false,
        confirmModal: false,
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


    showConfirmModal = (user) => {
        
        this.setState({ confirmModal: true, user})
    }

    hideConfirmFormModal = () => {
        this.setState({ confirmModal: false, user: {}})
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }

    handleEdit = (id) => {
        this.props.history.push(`/dashboard/users/${id}/edit`)
    }

    render() {
        const {users, updateSuccess} = this.props.users.state;
        const { user, showUserModal, confirmModal } = this.state;
       const {classes} = this.props
        return (
            <>
                <UserModal show={showUserModal} hideModal={this.hideModal} user={user}/>
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
                            handleEdit={this.handleEdit}
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