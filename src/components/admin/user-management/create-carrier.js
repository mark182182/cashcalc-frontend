import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Check, Close, Person, VpnKey } from '@material-ui/icons';
import { createCarrier, getUsernames } from '../../../action/admin';
import { snackbarError } from '../../../action/snackbar';
import './carrier.scss';

const mapDispatch = (dispatch) => {
  return {
    createCarrier: (username, password) =>
      dispatch(createCarrier(username, password)),
    snackbarError: (message) => dispatch(snackbarError(message)),
    getUsernames: () => dispatch(getUsernames()),
  };
};

const CreateCarrierConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    props.getUsernames();
  }, []);

  useEffect(() => {
    if (props.createStatus === true && props.createIsLoading === false) {
      props.close();
      props.reload();
    }
  }, [props.createStatus]);

  const handleCreate = () => {
    const user = username.current.value;
    const pass = password.current.value;

    if (pass === null || pass.length < 8) {
      props.snackbarError('A jelszónak minimum 8 karakternek kell lennie!');
    } else if (user === null || user.length < 5) {
      props.snackbarError(
        'A felhasználónévnek minimum 5 karakternek kell lennie!'
      );
    } else if (pass === null || pass.length < 5) {
      props.snackbarError('A felhasználónév maximum 30 karakternek lehet!');
    } else {
      if (props.usernames.includes(user)) {
        props.snackbarError('Ez a felhasználónév már létezik!');
      } else {
        props.createCarrier(user, pass);
      }
    }
  };

  return (
    <>
      <DialogTitle className="result-header">
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>Létrehozás</Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container item direction="column">
            <TextField
              className="create-carrier-input"
              type="email"
              variant="outlined"
              required
              placeholder="Név..."
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
          <Grid container item direction="column">
            <TextField
              className="create-carrier-input"
              type="password"
              variant="outlined"
              required
              placeholder="Jelszó..."
              inputRef={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
                inputProps: { minLength: 8 },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <IconButton
            aria-label="delete"
            className="carrier-delete-button"
            onClick={props.close}
          >
            <Close />
          </IconButton>
          <IconButton
            aria-label="delete"
            className="carrier-create-button"
            onClick={handleCreate}
            disabled={props.createIsLoading === true}
          >
            <Check />
          </IconButton>
        </DialogActions>
      </DialogActions>
    </>
  );
};

const mapState = (state) => {
  return {
    createStatus: state.adminReducer.createStatus,
    createIsLoading: state.adminReducer.createIsLoading,
    usernames: state.adminReducer.usernames,
  };
};

const CreateCarrier = connect(mapState, mapDispatch)(CreateCarrierConnected);
export default CreateCarrier;
