import React from 'react'
import PropTypes from 'prop-types';
import { Icon, Table, Button} from 'semantic-ui-react'

import  AwardList from './awardList';
import AwardModal from './awardModal';
import AwardForm from './awardForm';
import AwardConfirmModal from '../common/awardConfirmModal';

class Awards extends React.Component {
    state = {
        showAwardModal: false,
        formModalShow: false,
        confirmModal: false,
        award: {}
    }

    componentDidMount() {
        if(this.props.title === "EOY") {
            this.props.awards.getEOY();
        } else {
            this.props.awards.getEOM();
        }
        
    }

    showModal = (award) => {
        this.setState({ showAwardModal: true, award})
    }

    hideModal = () => {
        this.setState({ showAwardModal: false, award: {}})
    }

    showFormModal = (award = {}) => {
       
        this.setState({ formModalShow: true, award})
    }

    hideFormModal = () => {
        this.setState({ formModalShow: false, award: {}, title: ''})
    }

    showConfirmModal = (award) => {
        
        this.setState({ confirmModal: true, award})
    }

    hideConfirmFormModal = () => {
        this.setState({ confirmModal: false, award: {}})
    }

    deleteAward = (id) => {
        if(this.props.title === "EOY") {
            this.props.deleteEOY(id);
        } else {
            this.props.deleteEOM(id);
        }
        
    }

   

    render() {
        const {awardsEOY, awardsEOM, loading, error, updateSuccess} = this.props.awards.state;
        const { award, showAwardModal,formModalShow, confirmModal } = this.state;
        const { createEOY, createEOM, deleteEOM, deleteEOY } = this.props.awards;
        const awards = this.props.title === "EOY" ? awardsEOY : awardsEOM;
        return (
            <>
                <AwardModal show={showAwardModal} hideModal={this.hideModal} award={award}/>
               {formModalShow && 
                    <AwardForm 
                        show={formModalShow} 
                        hideFormModal={this.hideFormModal} 
                        initializeForm={this.props.awards.initializeForm}
                        loading={loading}
                        error={error}
                        title={this.props.title}
                        updateSuccess={updateSuccess}
                        createAward={this.props.title === "EOY" ? createEOY : createEOM}
                    />
                }
                 {confirmModal && 
                    <AwardConfirmModal 
                        hideConfirmFormModal={this.hideConfirmFormModal} 
                        collection={award} 
                        deleteRecord={this.props.title === "EOY" ? deleteEOY : deleteEOM}
                        initializeForm={this.props.awards.initializeForm}
                        updateSuccess={updateSuccess}
                    />
                }
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button icon labelPosition='left' primary size='small' onClick={() => this.showFormModal()}>
                                    <Icon name='user' /> Add Award
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Employee Name</Table.HeaderCell>
                            <Table.HeaderCell>Employee Email</Table.HeaderCell>
                            <Table.HeaderCell>Date Awarded</Table.HeaderCell>
                            <Table.HeaderCell>Creator</Table.HeaderCell>
                            <Table.HeaderCell>File</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {awards.length > 0 ?
                            <AwardList 
                            awards={awards} 
                            showModal={this.showModal} 
                            showFormModal={this.showFormModal}
                            showConfirmModal={this.showConfirmModal}
                            /> :
                            <Table.Row >
                                <Table.Cell>No record found</Table.Cell>
                            </Table.Row>
                        }
                        
                    </Table.Body>

                </Table>
            </>
        )
    }
}

Awards.propTypes = {
    title: PropTypes.string.isRequired
}

export default Awards;
  