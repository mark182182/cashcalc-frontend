import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, resetUser } from '../../action/login';
import { Grid, Typography } from '@material-ui/core';
import { SnackBarWrapper } from '../snackbar-wrapper/snackbar-wrapper';

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
    return () => {
      props.resetUser();
    };
  }, []);

  const login = () => {
    props.loginUser(username.current.value, password.current.value);
  };

  return (
    <Grid>
      <SnackBarWrapper
        reset={props.resetUser}
        isLoading={props.loginIsLoading}
        status={props.loginStatus}
        message={props.loginMessage}
      />
      <Grid>
        <Typography>Bejelentkezés</Typography>
        <Grid className="control">
          <Grid className="field">
            <Grid className="control has-icons-left">
              <input className="input" ref={username} type="email" required />
              <span className="icon is-small is-left">
                <Grid>icon</Grid>
              </span>
            </Grid>
          </Grid>
          <Grid className="field">
            <Grid className="control has-icons-left">
              <input
                className="input"
                ref={password}
                type="password"
                required
              />
              <span className="icon is-small is-left">
                <Grid>icon</Grid>
              </span>
            </Grid>
          </Grid>
        </Grid>
        <footer>
          <button className="button is-primary" onClick={login}>
            Belépés
          </button>
        </footer>
      </Grid>
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
