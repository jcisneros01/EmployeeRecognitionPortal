import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Table, Image, Header } from 'semantic-ui-react';

const UserList = ({users, showModal, showFormModal,showConfirmModal}) => (
    users.map((user, index) => {
        return <Table.Row key={user.id}>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>
                <Image src={`data:image/png;base64, ${user.signature}`} rounded size="tiny"/>
            </Table.Cell>
            <Table.Cell>
                {user.email}
            </Table.Cell>
            <Table.Cell className="actions">
                <Menu.Item as='a' icon>
                    <Icon name='eye' onClick={() => showModal(user)}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='edit' onClick={() => showFormModal(user, 'edit')}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='trash alternate' onClick={() => showConfirmModal(user)}/>
                </Menu.Item>
            </Table.Cell>
        </Table.Row>
    })
) 

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showFormModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired
}

export default UserList;