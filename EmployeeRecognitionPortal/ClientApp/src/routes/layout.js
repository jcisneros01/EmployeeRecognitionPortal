import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import {
    withStyles,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import MainListItems from './listItems';
import LoginContainer from '../containers/LoginContainer';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class Layout extends React.Component {
    state = {
        open: true,
        title: 'dashboard'
    };
 
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    setAppHeader = (title) => {
        
        this.setState({ title })
    }

    render() {

        const { classes, location,  path } = this.props;
       
        return (<Subscribe to={[LoginContainer]}>
            {login => {
                return <div className={classes.root}>
                    
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                        >
                            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(
                                        classes.menuButton,
                                        this.state.open && classes.menuButtonHidden,
                                    )}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    className={classes.title}
                                >
                                    {path ? path : 'dashboard'}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                            }}
                            open={this.state.open}
                        >
                            <div className={classes.toolbarIcon}>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    className={classes.title}
                                >
                                    Employee Portal
                                </Typography>
                                <IconButton onClick={this.handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                            <MainListItems
                                isAdmin={localStorage.isAdmin}
                                    logout={login.logout}
                                    location={location}
                                    path={path}
                                />
                            </List>

                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            {this.props.children}
                        </main>
               

                </div>
            }}
        </Subscribe>)

    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);