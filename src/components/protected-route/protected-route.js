import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import constants from '../../constants/constants';

const ProtectedRouteConnected = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        props.role !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: constants.ROUTES.LOGIN,
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
    role: state.loginReducer.role,
  };
};

const ProtectedRoute = connect(mapState, null)(ProtectedRouteConnected);
export default ProtectedRoute;
