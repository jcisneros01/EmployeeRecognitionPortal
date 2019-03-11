import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import Visibility from '@material-ui/icons/Visibility';
import moment from 'moment'

const styles = theme => ({
  
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
  }); 

const AwardList = ({awards, showModal,showConfirmModal, classes}) => (
    awards.map((award) => {
        return <TableRow key={award.id}>
            <TableCell>{award.id}</TableCell>
            <TableCell>
                {award.employeeName}
            </TableCell>
            <TableCell>
                {award.employeeEmail}
            </TableCell>
            <TableCell>
                {moment(Date(award.dateAwarded)).format("MMM-DD-YYYY")}
            </TableCell>
            <TableCell>
                {award.awardCreatorId}
            </TableCell>
           
            <TableCell className="actions">
                <Visibility className={classes.icon} onClick={() => showModal(award)}/>
                <DeleteIcon className={classes.icon} onClick={() => showConfirmModal(award)}/>
            </TableCell>
        </TableRow>
    })
) 

AwardList.propTypes = {
    awards: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired
}

export default withStyles(styles)(AwardList);