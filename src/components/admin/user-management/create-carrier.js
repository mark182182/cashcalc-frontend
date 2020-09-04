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
  let username = '';
  let password = '';

  useEffect(() => {
    props.getUsernames();
  }, []);

  useEffect(() => {
    if (props.createStatus === true && props.createIsLoading === false) {
      props.close();
      props.reload();
    }
  }, [props.createStatus]);

  const handleInputChange = (event, type) => {
    const value = event.currentTarget.value;
    if (type === 'username') {
      if (props.usernames.includes(value)) {
        props.snackbarError('Ez a felhasználónév már létezik!');
      }
      username = value;
    } else {
      password = value;
    }
  };

  const handleCreate = () => {
    if (
      username === null ||
      username.length === 0 ||
      password === null ||
      password.length < 8
    ) {
      props.snackbarError('A jelszónak minimum 8 karakternek kell lennie!');
    } else {
      if (props.usernames.includes(username)) {
        props.snackbarError('Ez a felhasználónév már létezik!');
      } else {
        props.createCarrier(username, password);
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
              onChange={(event) => handleInputChange(event, 'username')}
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
              onChange={(event) => handleInputChange(event, 'password')}
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
