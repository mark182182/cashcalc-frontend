import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/login';
import Main from './components/main/main';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store, { history } from '../src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from './components/protected-route/protected-route';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'normalize.css';
import './styles/style.scss';

ReactDOM.render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/main">
            <Main />
          </ProtectedRoute>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
