import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { loginUser, resetUser } from '../../action/login';
import constants from '../../constants/constants';
import { Person, VpnKey } from '@material-ui/icons';
import './login.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    resetUser: () => dispatch(resetUser()),
  };
};

export const LoginConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    const oldStorage = localStorage.getItem('askForStorage');
    if (oldStorage === null) {
      localStorage.setItem('askForStorage', false);
    }
    const newStorage = localStorage.getItem('askForStorage');
    if (document.hasStorageAccess && newStorage === 'false') {
      document.hasStorageAccess().then((hasAccess) => {
        if (!hasAccess) {
          document.requestStorageAccess().then(() => {
            localStorage.setItem('askForStorage', true);
          });
        } else {
          localStorage.setItem('askForStorage', true);
        }
      });
    }
    if (props.loginStatus !== 'success') {
      props.resetUser();
    }
  }, []);

  const login = () => {
    props.loginUser(username.current.value, password.current.value);
  };

  return (
    <Grid container>
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
