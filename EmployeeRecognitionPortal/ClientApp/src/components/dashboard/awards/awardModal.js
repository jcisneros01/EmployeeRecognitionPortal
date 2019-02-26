import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react';

const AwardModal = ({show, hideModal, award}) => (
  <Modal open={show} dimmer="blurring">
    <Modal.Header>Award Detail</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>{award.employeeName}</Header>
        <p>{award.employeeEmail}</p>
        <p>{award.dateAwarded}</p>
        <p>{award.awardCreatorId}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={() => hideModal()}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
)

AwardModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  award: PropTypes.object.isRequired
}

export default AwardModal