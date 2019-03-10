import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, withStyles } from '@material-ui/core';
import { Image } from 'semantic-ui-react';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';

const styles = theme => ({
  
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
  }); 

const UserList = ({users, showModal, handleEdit,showConfirmModal, classes}) => (
    users.map((user) => {
        return <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
                <Image src={`data:image/png;base64, ${user.signature}`} rounded size="tiny"/>
            </TableCell>
            <TableCell>
                {user.email}
            </TableCell>
            <TableCell align="right">
                <Visibility className={classes.icon} onClick={() => showModal(user)}/>
                <Create className={classes.icon} onClick={() => handleEdit(user.id)}/>
                <DeleteIcon className={classes.icon} onClick={() => showConfirmModal(user)}/>
            </TableCell>
        </TableRow>
    })
) 

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    showModal: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    showConfirmModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default  withStyles(styles)(UserList);