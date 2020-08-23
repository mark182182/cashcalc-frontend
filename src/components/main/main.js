import React, { useState, useEffect } from 'react';
import {
  Grid,
  Tabs,
  Tab,
  TabPanel,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Admin } from '../admin/admin';
import Login from '../login/login';
import { SuperUser } from '../superuser/superuser';
import { connect } from 'react-redux';
import constants from '../../constants/constants';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Calculation } from '../calculation/calculation';
import { logout } from '../../action/logout';
import ProtectedRoute from '../protected-route/protected-route';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './main.scss';

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const MainConnected = (props) => {
  const [currentTab, setTab] = useState(null);
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        setTab(null);
        toggleDrawer(false);
        props.logout();
        return <Redirect to="/login" />;
      case 1:
        props.validateRole(constants.ROLES.carrier);
        return <Calculation />;
      case 2:
        props.validateRole(constants.ROLES.admin);
        return <Admin />;
      case 3:
        props.validateRole(constants.ROLES.superuser);
        return <SuperUser />;
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
            <ListItem button onClick={() => setTab(index)} key={text}>
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
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/main">{renderCurrentTab()}</ProtectedRoute>
        </Switch>
      </Router>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    loginStatus: state.loginReducer.loginStatus,
    role: state.loginReducer.role,
  };
};

const Main = connect(mapState, mapDispatch)(MainConnected);
export default Main;
