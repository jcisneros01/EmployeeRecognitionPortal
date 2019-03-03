import React from 'react';
import { Link } from 'react-router-dom';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import * as routes from '../constants/routes';

class MainListItems extends React.Component {
    state = { activeItem: 'dashboard' }
    handleItemClick = (name) => {
        this.setState({ activeItem: name })
        this.props.setAppHeader(name);
    }
    render() {
        const { activeItem } = this.state
        const {isAdmin, logout} = this.props
       
        return(
            <div>
                {isAdmin && <>
                    <Link to={routes.DASHBOARD}>
                        <ListItem 
                            button 
                            selected={activeItem === 'dashboard'}
                            name="dashboard"
                            onClick={() => this.handleItemClick('dashboard')} 
                        >
                            <ListItemIcon>
                            <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <Link  to={`${routes.DASHBOARD}/${routes.ADMINS}`}>
                        <ListItem
                            button 
                            selected={activeItem === 'admins'}
                            name="admins"
                            onClick={() => this.handleItemClick('admins')} 
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admins" />
                        </ListItem>
                    </Link>
                    <Link  to={`${routes.DASHBOARD}/${routes.USERS}`}>
                        <ListItem
                            button 
                            selected={activeItem === 'users'}
                            name="users"
                            onClick={() => this.handleItemClick('users')} 
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </Link>
                </>}
                {!isAdmin && <>
                    <Link  to={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}>
                        <ListItem 
                            button 
                            selected={activeItem === 'awardsEOM'}
                            name="awardsEOM"
                            onClick={() => this.handleItemClick('awardsEOM')} 
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="awardsEOM" />
                        </ListItem>
                    </Link>
                    <Link  to={`${routes.DASHBOARD}/${routes.AWARDSEOY}`}>
                        <ListItem 
                            button 
                            selected={activeItem === 'awardsEOY'}
                            name="awardsEOY"
                            onClick={() => this.handleItemClick('awardsEOY')} 
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="awardsEOY" />
                        </ListItem>
                    </Link>
                </>}
                <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button onClick={() => logout()}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>
                
            </div>
        )
    }
}

export default MainListItems
  

