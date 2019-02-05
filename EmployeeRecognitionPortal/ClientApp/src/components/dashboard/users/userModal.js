import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const UserModal = ({show, hideModal, user}) => (
  <Modal open={show} dimmer="blurring">
    <Modal.Header>User Detail</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={`data:image/png;base64, ${user.signature}`} />
      <Modal.Description>
        <Header>{user.name}</Header>
        <p>{user.email}</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={() => hideModal()}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
)

UserModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default UserModal