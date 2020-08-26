import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, resetUser } from '../../action/login';
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { SnackBarWrapper } from '../snackbar-wrapper/snackbar-wrapper';
import { Redirect } from 'react-router-dom';
import { Person, VpnKey } from '@material-ui/icons';
import './login.scss';
import constants from '../../constants/constants';

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    resetUser: () => dispatch(resetUser()),
  };
};

export const LoginConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  const login = () => {
    props.loginUser(username.current.value, password.current.value);
  };

  return (
    <Grid container>
      {/* <SnackBarWrapper
        reset={props.resetUser}
        isLoading={props.loginIsLoading}
        status={props.loginStatus}
        message={props.loginMessage}
      /> */}
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
          <Button type="submit" onClick={login}>
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
