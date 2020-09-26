import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { loginUser, resetUser } from '../../action/login';
import constants from '../../constants/constants';
import { Person, VpnKey } from '@material-ui/icons';
import './login.scss';
import { snackbarError } from '../../action/snackbar';

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    resetUser: () => dispatch(resetUser()),
    snackbarError: (message) => dispatch(snackbarError(message)),
  };
};

export const LoginConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    document.hasStorageAccess &&
      document
        .hasStorageAccess()
        .then((hasAccess) => props.snackbarError('Státusz: ' + hasAccess));
    if (props.loginStatus !== 'success') {
      props.resetUser();
    }
  }, []);

  const login = () => {
    props.loginUser(username.current.value, password.current.value);
  };

  const acceptRequestWithUserGesture = (event) => {
    document.requestStorageAccess &&
      document.requestStorageAccess().then(
        () => {
          props.snackbarError('Megadva');
          console.log('granted');
        },
        () => {
          console.log('denied');
        }
      );
  };

  return (
    <Grid container>
      <Button onClick={acceptRequestWithUserGesture}>Accept cookie</Button>
      <Grid container className="login-wrapper" direction="column">
        <Grid container className="login-container">
          <Grid container className="login-username" justify="center">
            <TextField
              className="input"
              type="email"
              required
              inputRef={username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container className="login-password" justify="center">
            <TextField
              className="input"
              inputRef={password}
              type="password"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container item justify="flex-end">
          <Button type="submit" onClick={login} disabled={props.loginIsLoading}>
            Belépés
          </Button>
        </Grid>
      </Grid>
      {props.loginStatus === 'success' && (
        <Redirect to={constants.ROUTES.HOME + constants.ROUTES.WELCOME} />
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    loginIsLoading: state.loginReducer.isLoading,
    loginStatus: state.loginReducer.status,
    loginMessage: state.loginReducer.message,
  };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginConnected);
export default Login;
