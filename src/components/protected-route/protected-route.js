import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
              pathname: '/login',
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
