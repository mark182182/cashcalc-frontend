import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateRole } from '../../action/admin';
import constants from '../../constants/constants';
import { Grid, CircularProgress } from '@material-ui/core';

const mapDispatch = (dispatch) => {
  return {
    validateRole: (role) => dispatch(validateRole(role)),
  };
};

const RoleBasedRouteConnected = ({ children, ...props }) => {
  const [prevRole, setPrevRole] = useState(false);

  useEffect(() => {
    if (props.checkRole && props.checkRole !== prevRole) {
      props.validateRole(props.checkRole);
      setPrevRole(props.checkRole);
    }
  }, [props.checkRole]);

  return (
    <Route
      {...props}
      render={({ location }) => {
        switch (props.isAuthorized) {
          case true:
            return props.checkRole === prevRole ? children : null;
          case false:
            return (
              <Redirect
                to={{
                  pathname: constants.ROUTES.ERROR_403,
                  state: { from: location },
                }}
              />
            );
          case null:
            return (
              <Grid container item justify="center">
                <CircularProgress disableShrink={true} />
              </Grid>
            );
        }
      }}
    />
  );
};

const mapState = (state) => {
  return {
    isAuthorized: state.adminReducer.isAuthorized,
  };
};

const RoleBasedRoute = connect(mapState, mapDispatch)(RoleBasedRouteConnected);
export default RoleBasedRoute;
