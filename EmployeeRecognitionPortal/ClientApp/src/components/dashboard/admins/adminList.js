import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Table, Image } from 'semantic-ui-react';

const AdminList = ({admins, showModal, showFormModal,showConfirmModal}) => (
    admins.map((admin, index) => {
        return <Table.Row key={admin.id}>
            <Table.Cell>{admin.id}</Table.Cell>
            
            <Table.Cell>
                {admin.email}
            </Table.Cell>
            <Table.Cell className="actions">
                <Menu.Item as='a' icon>
                    <Icon name='eye' onClick={() => showModal(admin)}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='edit' onClick={() => showFormModal(admin, 'edit')}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='trash alternate' onClick={() => showConfirmModal(admin)}/>
                </Menu.Item>
            </Table.Cell>
        </Table.Row>
    })
) 

AdminList.propTypes = {
    admins: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showFormModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired
}

export default AdminList;