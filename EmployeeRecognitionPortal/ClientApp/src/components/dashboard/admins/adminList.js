import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu} from 'semantic-ui-react';
import { TableCell, TableRow } from '@material-ui/core';

const AdminList = ({admins, showModal, showFormModal,showConfirmModal}) => (
    admins.map((admin, index) => {
        return <TableRow key={admin.id}>
            <TableCell component="th" scope="row">
                {admin.id}
            </TableCell>
            <TableCell align="right">{admin.email}</TableCell>
            <TableCell align="right">
                <Menu.Item as='a' icon>
                    <Icon name='eye' onClick={() => showModal(admin)}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='edit' onClick={() => showFormModal(admin, 'edit')}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='trash alternate' onClick={() => showConfirmModal(admin)}/>
                </Menu.Item>
            </TableCell>
        </TableRow>
    })
) 

AdminList.propTypes = {
    admins: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showFormModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired
}

export default AdminList;