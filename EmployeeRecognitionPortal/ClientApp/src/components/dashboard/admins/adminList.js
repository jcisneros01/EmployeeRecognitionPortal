import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';

const styles = theme => ({
  
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
  });

 
const AdminList = ({admins, showModal, handleEdit,showConfirmModal, classes}) => (
    admins.map((admin) => {
        return <TableRow key={admin.id}>
            <TableCell component="th" scope="row">
                {admin.id}
            </TableCell>
            <TableCell align="right">{admin.email}</TableCell>
            <TableCell align="right">
                <Visibility className={classes.icon} onClick={() => showModal(admin)}/>
                <Create className={classes.icon} onClick={() => handleEdit(admin.id)}/>
                <DeleteIcon className={classes.icon} onClick={() => showConfirmModal(admin)}/>
            </TableCell>
        </TableRow>
    })
) 

AdminList.propTypes = {
    admins: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(AdminList);