import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  Menu } from 'semantic-ui-react'

import * as routes from './constants/routes';

class Navigation extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render (){
        const { activeItem } = this.state
        const { isAuthenticated, logout, isAdmin }  = this.props;
        
        return (
            <Menu secondary>
            <Menu.Item header>Employee Recognition Portal</Menu.Item>
                
                { isAuthenticated ?
                    (<>
                        <Menu.Item 
                            as={Link} 
                            to={routes.DASHBOARD} 
                            name="dashboard" 
                            active={activeItem === 'dashboard'} 
                            onClick={this.handleItemClick} 
                        />
                        {isAdmin && <>
                            <Menu.Item 
                                as={Link} 
                                to={`${routes.DASHBOARD}/${routes.ADMINS}`}
                                name="admins" 
                                active={activeItem === 'admins'} 
                                onClick={this.handleItemClick} 
                            />
                            <Menu.Item 
                                as={Link} 
                                to={`${routes.DASHBOARD}/${routes.USERS}`}
                                name="users" 
                                active={activeItem === 'users'} 
                                onClick={this.handleItemClick} 
                            />
                        </>}
                        
                        {!isAdmin && <>
                            <Menu.Item 
                                as={Link} 
                                to={`${routes.DASHBOARD}/${routes.AWARDSEOM}`}
                                name="awardsEOM" 
                                active={activeItem === 'awardsEOM'} 
                                onClick={this.handleItemClick} 
                            />
                            <Menu.Item 
                                as={Link} 
                                to={`${routes.DASHBOARD}/${routes.AWARDSEOY}`}
                                name="awardsEOY" 
                                active={activeItem === 'awardsEOY'} 
                                onClick={this.handleItemClick} 
                            />
                        </>}
                         
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={() => logout()}
                        />
                    </>) : 
                    <>
                    <Menu.Item 
                        as={Link} 
                        to={routes.ROOT} 
                        name="home" 
                        active={activeItem === 'home'} 
                        onClick={this.handleItemClick} 
                    />
                    <Menu.Item
                        name='login'
                        as={Link}
                        to={routes.SIGN_IN}
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    />
                    </>
                }
              
            </Menu>
        );
    }

}



Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}    

export default Navigation;    