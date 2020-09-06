import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { history } from '../../store/store';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Login from '../login/login';
import { Home } from '../home/home';
import { logout } from '../../action/logout';
import constants from '../../constants/constants';
import SnackbarWrapper from '../snackbar-wrapper/snackbar-wrapper';
import { Menu } from '@material-ui/icons';
import './header.scss';

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export const HeaderConnected = (props) => {
  document.addEventListener('scroll', () => {
    document.documentElement.dataset.scroll = window.scrollY;
  });

  useEffect(() => {
    document.documentElement.dataset.scroll = 0;
  }, []);

  const [isDrawerOpen, toggleDrawer] = useState(false);

  const renderCurrentTab = (index) => {
    switch (index) {
      case 0:
        toggleDrawer(false);
        props.logout();
        break;
      case 1:
        history.push(constants.ROUTES.HOME + constants.ROUTES.CALCULATION);
        break;
      case 2:
        history.push(constants.ROUTES.HOME + constants.ROUTES.ADMIN);
        break;
      case 3:
        history.push(constants.ROUTES.HOME + constants.ROUTES.SUPERUSER);
        break;
    }
    toggleDrawer(false);
  };

  const getRole = () => {
    return constants.RIGHTS[props.role];
  };

  const drawer = (
    <List>
      {['Kijelentkezés', 'Kalkuláció', 'Admin', 'Super'].map((text, index) => {
        if (getRole() >= index) {
          return (
            <ListItem button onClick={() => renderCurrentTab(index)} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          );
        }
      })}
    </List>
  );

  return (
    <Grid container className="navbar-main">
      <Grid container className="navbar-header">
        <SnackbarWrapper />
        <Grid container className="navbar-menu">
          {props.role !== null && (
            <Grid container className="navbar-menu-button">
              <IconButton onClick={() => toggleDrawer(true)}>
                <Menu />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Hidden>
          <Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
            {drawer}
          </Drawer>
        </Hidden>
        <Grid
          container
          className="navbar-brand"
          alignItems="center"
          justify="flex-end"
        >
          <img src="../favicon.ico" width="15%" />
          <Typography variant="button">CASHCALC</Typography>
        </Grid>
      </Grid>
      <Grid container className="navbar-content">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={constants.ROUTES.LOGIN}>
              <Login />
            </Route>
            <ProtectedRoute path={constants.ROUTES.HOME}>
              <Home />
            </ProtectedRoute>
            <Route path="*">
              <Redirect to={constants.ROUTES.LOGIN} />
            </Route>
          </Switch>
        </ConnectedRouter>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    loginStatus: state.loginReducer.loginStatus,
    role: state.loginReducer.role,
  };
};

const Header = connect(mapState, mapDispatch)(HeaderConnected);
export default Header;
