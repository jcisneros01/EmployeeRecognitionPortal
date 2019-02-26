import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Table, Image } from 'semantic-ui-react';

const AwardList = ({awards, showModal, showFormModal,showConfirmModal}) => (
    awards.map((award, index) => {
        return <Table.Row key={award.id}>
            <Table.Cell>{award.id}</Table.Cell>
            <Table.Cell>
                {award.employeeName}
            </Table.Cell>
            <Table.Cell>
                {award.employeeEmail}
            </Table.Cell>
            <Table.Cell>
                {award.dateAwarded}
            </Table.Cell>
            <Table.Cell>
                {award.awardCreatorId}
            </Table.Cell>
           
            <Table.Cell className="actions">
                <Menu.Item as='a' icon>
                    <Icon name='eye' onClick={() => showModal(award)}/>
                </Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='trash alternate' onClick={() => showConfirmModal(award)}/>
                </Menu.Item>
            </Table.Cell>
        </Table.Row>
    })
) 

AwardList.propTypes = {
    awards: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showFormModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired
}

export default AwardList;