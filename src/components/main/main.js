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
import { Air } from '../air/air';
import Road from '../road/road';
import { Admin } from '../admin/admin';
import Login from '../login/login';
import { SuperUser } from '../superuser/superuser';
import { connect } from 'react-redux';
import constants from '../../constants/constants';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Calculation } from '../calculation/calculation';
import { logout } from '../../action/logout.js';
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
        return <Login redirect={redirectToCalc} />;
      case 1:
        return <Calculation />;
      case 2:
        return <Admin />;
      case 3:
        return <SuperUser />;
      case null:
        return <Login redirect={redirectToCalc} />;
      default:
        return <Login redirect={redirectToCalc} />;
    }
  };

  const redirectToCalc = () => {
    setTab(1);
  };

  const getRole = () => {
    return constants.ROLES[props.role];
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
        {props.role !== null && (
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
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
      {renderCurrentTab()}
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
