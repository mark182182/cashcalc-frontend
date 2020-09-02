import React, { useEffect, useRef } from 'react';
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
import { createAdmin } from '../../action/superuser';
import { snackbarError } from '../../action/snackbar';
import './superuser.scss';

const mapDispatch = (dispatch) => {
  return {
    createAdmin: (username, password) =>
      dispatch(createAdmin(username, password)),
    snackbarError: (message) => dispatch(snackbarError(message)),
  };
};

const CreateAdminConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    if (props.createStatus === true && props.createIsLoading === false) {
      props.close();
      props.reload();
    }
  }, [props.createStatus]);

  const handleCreate = () => {
    const name = username.current.value;
    const pass = password.current.value;
    if (name.length === 0 || pass.length < 8) {
      props.snackbarError('A jelszónak minimum 8 karakternek kell lennie!');
    } else {
      props.createAdmin(username.current.value, password.current.value);
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
                inputProps: { minLength: 8 },
              }}
              inputRef={password}
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
    createStatus: state.superuserReducer.createStatus,
    createIsLoading: state.superuserReducer.createIsLoading,
  };
};

const CreateAdmin = connect(mapState, mapDispatch)(CreateAdminConnected);
export default CreateAdmin;