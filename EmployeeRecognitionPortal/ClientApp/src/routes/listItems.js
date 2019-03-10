import React from 'react';
import { Link } from 'react-router-dom';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BuildIcon from '@material-ui/icons/Build';
import * as routes from '../constants/routes';

class MainListItems extends React.Component {

    render() {

        const { isAdmin, logout, path } = this.props
       
        return (
            <div>
                {isAdmin === "true" && <>
                    <ListItem
                        button
                        selected={path.toLowerCase() === 'dashboard'}
                        name="dashboard"
                        component={Link}
                        to={routes.DASHBOARD}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem
                        button
                        selected={path.toLowerCase() === 'admins'}
                        name="admins"
                        component={Link}
                        to={`${routes.DASHBOARD}/${routes.ADMINS}`}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admins" />
                    </ListItem>

                    <ListItem
                        button
                        selected={path.toLowerCase() === 'users'}
                        name="users"
                        component={Link}
                        to={`${routes.DASHBOARD}/${routes.USERS}`}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </>}

                {
                   isAdmin === "false" && <>
                    <ListItem
                        button
                        selected={path.toLowerCase() === 'awardseom'}
                        name="awardsEOM"
                        component={Link}
                        to={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="awardsEOM" />
                    </ListItem>
                    <ListItem
                        button
                        selected={path.toLowerCase() === 'awardseoy'}
                        name="awardsEOY"
                        component={Link}
                        to={`${routes.DASHBOARD}/${routes.AWARDSEOY}`}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="awardsEOY" />
                    </ListItem>
                    <ListItem
                        button
                        selected={path.toLowerCase() === 'settings'}
                        name="settings"
                        component={Link}
                        to={`${routes.DASHBOARD}/${routes.USERS}/settings`}
                    >
                        <ListItemIcon>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>

                </>}
             
                <ListItem button onClick={() => logout()}>
                    <ListItemText primary="Logout" />
                </ListItem>

            </div>
        )
    }
}

export default MainListItems


