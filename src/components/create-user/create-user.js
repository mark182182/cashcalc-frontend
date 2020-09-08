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
import { snackbarError } from '../../action/snackbar';
import { getUsernames } from '../../action/admin';
import './create-user.scss';

const mapDispatch = (dispatch) => {
  return {
    snackbarError: (message) => dispatch(snackbarError(message)),
    getUsernames: () => dispatch(getUsernames()),
  };
};

const CreateUserConnected = (props) => {
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

    if (pass == null || pass.length < 8) {
      props.snackbarError('A jelszónak minimum 8 karakternek kell lennie!');
    } else if (pass == null || pass.length >= 30) {
      props.snackbarError('A jelszó maxium 30 karakter lehet!');
    } else if (user == null || user.length < 5) {
      props.snackbarError(
        'A felhasználónévnek minimum 5 karakternek kell lennie!'
      );
    } else if (user == null || user.length >= 30) {
      props.snackbarError('A felhasználónév maximum 30 karakter lehet!');
    } else {
      if (props.usernames.includes(user)) {
        props.snackbarError('Ez a felhasználónév már létezik!');
      } else {
        props.createUser(user, pass);
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
              className="create-user-input"
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
                inputProps: { minLength: 5, maxLength: 30 },
              }}
            />
          </Grid>
          <Grid container item direction="column">
            <TextField
              className="create-user-input"
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
                inputProps: { minLength: 8, maxLength: 30 },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <IconButton
            aria-label="delete"
            className="user-delete-button"
            onClick={props.close}
          >
            <Close />
          </IconButton>
          <IconButton
            aria-label="delete"
            className="user-create-button"
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
    usernames: state.adminReducer.usernames,
  };
};

const CreateUser = connect(mapState, mapDispatch)(CreateUserConnected);
export default CreateUser;
