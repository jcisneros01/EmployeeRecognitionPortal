import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import {  Menu } from 'semantic-ui-react'

import * as routes from './constants/routes';
import { logout } from './actions/authentication';


class Navigation extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render (){
        const { activeItem } = this.state
        const { isAuthenticated, logout }  = this.props;
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
                        <Menu.Item 
                            as={Link} 
                            to={`${routes.DASHBOARD}/${routes.USERS}`}
                            name="users" 
                            active={activeItem === 'users'} 
                            onClick={this.handleItemClick} 
                        />
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
                {/* { !isAuthenticated &&
                    <Menu.Item
                        name='SignUp'
                        as={Link}
                        to={routes.SIGN_UP}
                        active={activeItem === 'SignUp'}
                        onClick={this.handleItemClick}
                    /> 
                } */}
              
            </Menu>
        );
    }

}



Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}    

function mapStateToProps(state) {
 
    return {
        isAuthenticated: !!state.auth.token
    }
}   

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);    