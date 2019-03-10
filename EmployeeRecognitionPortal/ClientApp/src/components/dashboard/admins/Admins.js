import React from 'react'
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import  AdminList from './adminList';
import AdminModal from './adminModal';
import ConfirmModal from '../common/confirmModal';

const styles = {
    table: {
      minWidth: 700,
    },
  };

class Admins extends React.Component {
    state = {
        showAdminModal: false,
        formModalShow: false,
        confirmModal: false,
        admin: {}
    }

    componentDidMount() {
        this.props.admins.getAdmins();
    }

    showModal = (admin) => {
        this.setState({ showAdminModal: true, admin})
    }

    hideModal = () => {
        this.setState({ showAdminModal: false, admin: {}})
    }


    showConfirmModal = (admin) => {
        this.setState({ confirmModal: true, admin})
    }

    hideConfirmFormModal = () => {
        this.setState({ confirmModal: false, admin: {}})
    }

    handleEdit = (id) => {
        this.props.history.push(`/dashboard/admins/${id}/edit`)
    }

   

    render() {
        const { admins, updateSuccess } = this.props.admins.state;
        const { admin, showAdminModal, confirmModal } = this.state;
        const {classes} = this.props
       
        return (
            <>
                <AdminModal show={showAdminModal} hideModal={this.hideModal} admin={admin}/>
                {confirmModal && 
                    <ConfirmModal 
                        hideConfirmFormModal={this.hideConfirmFormModal} 
                        collection={admin} 
                        deleteRecord={this.props.admins.deleteAdmin}
                        initializeForm={this.props.admins.initializeForm}
                        updateSuccess={updateSuccess}
                    />
                }
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.length > 0 ? 
                            <AdminList 
                                admins={admins} 
                                showModal={this.showModal} 
                                handleEdit={this.handleEdit}
                                showConfirmModal={this.showConfirmModal}
                            /> :
                            <TableRow>
                                <TableCell>No record found</TableCell>
                            </TableRow>
                        }
                   
                    </TableBody>
            </Table>
               
            </>
        )
    }
}

Admins.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Admins);