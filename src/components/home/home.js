import React from 'react';
import { Admin } from '../admin/admin';
import Superuser from '../superuser/superuser';
import constants from '../../constants/constants';
import { Welcome } from '../welcome/welcome';
import { Calculation } from '../calculation/calculation';
import { Error403 } from '../403/403';
import { Error404 } from '../404/404';
import ProtectedRoute from '../protected-route/protected-route';
import RoleBasedRoute from '../role-based-route/role-based-route';
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';

export const Home = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <ProtectedRoute path={constants.ROUTES.HOME + constants.ROUTES.WELCOME}>
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
          <Superuser />
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
        <Route path="*">
          <Redirect to={constants.ROUTES.HOME + constants.ROUTES.WELCOME} />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
};
