import React from 'react'
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import  AdminList from './adminList';
import AdminModal from './adminModal';
import AdminForm from './adminForm';
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
        formType: '',
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

    showFormModal = (admin = {}, formType = "new") => {
        this.setState({ formModalShow: true, formType, admin})
    }

    hideFormModal = () => {
        this.setState({ formModalShow: false, admin: {}, title: ''})
    }

    showConfirmModal = (admin) => {
        this.setState({ confirmModal: true, admin})
    }

    hideConfirmFormModal = () => {
        this.setState({ confirmModal: false, admin: {}})
    }

    deleteAdmin = (id) => {
        this.props.deleteAdmin(id)
    }

   

    render() {
        const { admins, loading, error, updateSuccess } = this.props.admins.state;
        const { admin, showAdminModal,formModalShow, formType, confirmModal } = this.state;
        const {classes} = this.props
       
        return (
            <>
                <AdminModal show={showAdminModal} hideModal={this.hideModal} admin={admin}/>
                {formModalShow && 
                    <AdminForm 
                        show={formModalShow} 
                        hideFormModal={this.hideFormModal} 
                        admin={admin} 
                        formType={formType} 
                        initializeForm={this.props.admins.initializeForm}
                        updateAdmin={this.props.admins.updateAdmin}
                        loading={loading}
                        error={error}
                        updateSuccess={updateSuccess}
                        createAdmin={this.props.admins.createAdmin}
                    /> 
                }
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
                        {/* <Button icon labelPosition='left' primary size='small' onClick={() => this.showFormModal()}>
                            <Icon name='user' /> Add Admin
                        </Button> */}
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
                                showFormModal={this.showFormModal}
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
  };
  
  export default withStyles(styles)(Admins);