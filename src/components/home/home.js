import React, { useState, useEffect } from 'react';
import {
  Grid,
  IconButton,
  Hidden,
  Drawer,
  List,
  ListItemText,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Admin } from '../admin/admin';
import { SuperUser } from '../superuser/superuser';
import { connect } from 'react-redux';
import constants from '../../constants/constants';
import { Welcome } from '../welcome/welcome';
import { Calculation } from '../calculation/calculation';
import { Error403 } from '../403/403';
import { Error404 } from '../404/404';
import { Error500 } from '../500/500';
import { logout } from '../../action/logout';
import ProtectedRoute from '../protected-route/protected-route';
import RoleBasedRoute from '../role-based-route/role-based-route';
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Menu as MenuIcon } from '@material-ui/icons';
import './home.scss';

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const HomeConnected = (props) => {
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
      <Grid container className="navbar-content">
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
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
      <ConnectedRouter history={history}>
        <Switch>
          <ProtectedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.WELCOME}
          >
            <Welcome />
          </ProtectedRoute>
          <RoleBasedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.CALCULATION}
            checkRole={constants.ROLES.carrier}
          >
            <Calculation />
          </RoleBasedRoute>
          <RoleBasedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.ADMIN}
            checkRole={constants.ROLES.admin}
          >
            <Admin />
          </RoleBasedRoute>
          <RoleBasedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.SUPERUSER}
            checkRole={constants.ROLES.superuser}
          >
            <SuperUser />
          </RoleBasedRoute>
          <ProtectedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.ERROR_403}
          >
            <Error403 />
          </ProtectedRoute>
          <ProtectedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.ERROR_404}
          >
            <Error404 />
          </ProtectedRoute>
          <ProtectedRoute
            path={constants.ROUTES.HOME + constants.ROUTES.ERROR_500}
          >
            <Error500 />
          </ProtectedRoute>
          <Route path="*">
            <Redirect to={constants.ROUTES.HOME + constants.ROUTES.WELCOME} />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    loginStatus: state.loginReducer.loginStatus,
    role: state.loginReducer.role,
  };
};

const Home = connect(mapState, mapDispatch)(HomeConnected);
export default Home;
