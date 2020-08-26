import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (props.checkRole) {
      props.validateRole(props.checkRole);
    }
  }, [props.checkRole]);

  return (
    <Route
      {...props}
      render={({ location }) =>
        props.isAuthorized !== false ? (
          props.isAuthorized === true ? (
            children
          ) : (
            <Grid container item justify="center">
              <CircularProgress disableShrink={true} />
            </Grid>
          )
        ) : (
          <Redirect
            to={{
              pathname: constants.ROUTES.ERROR_403,
              state: { from: location },
            }}
          />
        )
      }
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
