import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button,  Modal } from 'semantic-ui-react';

import {   initializeForm } from '../../../actions/users';

class ConfirmModal extends React.Component {
 

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
          <p>Are you sure you want to delete {collection.name}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => hideConfirmFormModal()}>No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => deleteRecord(collection.id)}/>
        </Modal.Actions>
      </Modal>
    );
  }
} 

ConfirmModal.propTypes = {
  hideConfirmFormModal: PropTypes.func.isRequired,
  collection: PropTypes.object.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
      updateSuccess: state.user.updateSuccess
  }
};



const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      initializeForm
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);