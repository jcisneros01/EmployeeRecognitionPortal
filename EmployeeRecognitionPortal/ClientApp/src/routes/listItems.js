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
    
    render() {
        
        const {isAdmin, logout, path} = this.props
    
        return(
            <div>
                {isAdmin && <>
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
                {!isAdmin && <>
                        <ListItem 
                            button 
                            selected={path.toLowerCase() === 'awardseom'}
                            name="awardsEOM"
                            component={Link}
                            to={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}
                        >
                            <ListItemIcon>
                                <ShoppingCartIcon />
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
  

