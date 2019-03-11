import React from 'react'
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import  AwardList from './awardList';
import AwardModal from './awardModal';
import AwardConfirmModal from '../common/awardConfirmModal';

const styles = {
    table: {
      minWidth: 700,
    },
  };
class Awards extends React.Component {
    state = {
        showAwardModal: false,
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
    handleEdit = (id) => {
        this.props.history.push(`/dashboard/awards/${id}/edit`)
    }

    render() {
        const {awardsEOY, awardsEOM, updateSuccess} = this.props.awards.state;
        const { award, showAwardModal, confirmModal } = this.state;
        const { deleteEOM, deleteEOY } = this.props.awards;
        const {classes} = this.props
        const awards = this.props.title === "EOY" ? awardsEOY : awardsEOM;
        return (
            <>
                <AwardModal show={showAwardModal} hideModal={this.hideModal} award={award}/>
                 {confirmModal && 
                    <AwardConfirmModal 
                        hideConfirmFormModal={this.hideConfirmFormModal} 
                        collection={award} 
                        deleteRecord={this.props.title === "EOY" ? deleteEOY : deleteEOM}
                        initializeForm={this.props.awards.initializeForm}
                        updateSuccess={updateSuccess}
                    />
                }
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Employee Email</TableCell>
                            <TableCell>Date Awarded</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {awards.length > 0 ?
                            <AwardList 
                            awards={awards} 
                            showModal={this.showModal} 
                            handleEdit={this.handleEdit}
                            showConfirmModal={this.showConfirmModal}
                            /> :
                             <p >No record found</p>
                        }
                        
                    </TableBody>

                </Table>
            </>
        )
    }
}

Awards.propTypes = {
    title: PropTypes.string.isRequired
}

export default withStyles(styles)(Awards);
  