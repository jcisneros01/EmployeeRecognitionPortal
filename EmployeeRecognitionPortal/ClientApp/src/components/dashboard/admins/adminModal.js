import React from 'react';
import PropTypes from 'prop-types';
import { Button,  Modal } from 'semantic-ui-react';

const AdminModal = ({show, hideModal, admin}) => (
  <Modal open={show} dimmer="blurring">
    <Modal.Header>Admin Detail</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>{admin.email}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={() => hideModal()}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
)

AdminModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
}

export default AdminModal