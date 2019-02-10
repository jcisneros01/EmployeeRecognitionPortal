import React from 'react';
import PropTypes from 'prop-types';

import { Button,  Modal } from 'semantic-ui-react';
class AwardConfirmModal extends React.Component {
 

  componentDidMount() {
    this.props.initializeForm();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.updateSuccess) {
        this.props.hideConfirmFormModal()
    } 
  }

  render () {
    const {hideConfirmFormModal, collection, deleteRecord} = this.props
    return (
      <Modal size="mini" open={true} >
        <Modal.Header>Delete Record!</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete {collection.employeeName}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => hideConfirmFormModal()}>No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => deleteRecord(collection.id)}/>
        </Modal.Actions>
      </Modal>
    );
  }
} 

AwardConfirmModal.propTypes = {
  hideConfirmFormModal: PropTypes.func.isRequired,
  collection: PropTypes.object.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
}

export default AwardConfirmModal;