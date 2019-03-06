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
        this.setState({ activeItem: name });
    }
    render() {
        const { activeItem } = this.state
        const {isAdmin, logout} = this.props
    
        return(
            <div>
                {isAdmin && <>
                        <ListItem 
                            button 
                            selected={activeItem === 'dashboard'}
                            name="dashboard"
                            component={Link}
                            to={routes.DASHBOARD}
                            onClick={() => this.handleItemClick('dashboard')} 
                        >
                            <ListItemIcon>
                            <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                   
                        <ListItem
                            button 
                            selected={activeItem === 'admins'}
                            name="admins"
                            component={Link}
                            to={`${routes.DASHBOARD}/${routes.ADMINS}`}
                            onClick={() => this.handleItemClick('admins')} 
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admins" />
                        </ListItem>
                  
                        <ListItem
                            button 
                            selected={activeItem === 'users'}
                            name="users"
                            component={Link}
                            to={`${routes.DASHBOARD}/${routes.USERS}`}
                            onClick={() => this.handleItemClick('users')} 
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                </>}
                {!isAdmin && <>
                        <ListItem 
                            button 
                            selected={activeItem === 'awardsEOM'}
                            name="awardsEOM"
                            component={Link}
                            to={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}
                            onClick={() => this.handleItemClick('awardsEOM')} 
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="awardsEOM" />
                        </ListItem>
                        <ListItem 
                            button 
                            selected={activeItem === 'awardsEOY'}
                            name="awardsEOY"
                            component={Link}
                            to={`${routes.DASHBOARD}/${routes.AWARDSEOY}`}
                            onClick={() => this.handleItemClick('awardsEOY')} 
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="awardsEOY" />
                        </ListItem>
                    
                </>}
                {/* <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem> */}
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
  

