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
import { createCarrier } from '../../../action/admin';
import './carrier.scss';

const mapDispatch = (dispatch) => {
  return {
    createCarrier: (username, password) =>
      dispatch(createCarrier(username, password)),
  };
};

const CreateCarrierConnected = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    if (props.carrierStatus === true) {
      props.close();
      props.reload();
    }
  }, [props.carrierStatus]);

  const handleCreate = () => {
    const name = username.current.value;
    const pass = password.current.value;
    if (name.length === 0 || pass.length < 8) {
      console.error('hopika');
    } else {
      props.createCarrier(username.current.value, password.current.value);
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
              className="input"
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
              className="input"
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
    carrierStatus: state.adminReducer.carrierStatus,
  };
};

const CreateCarrier = connect(mapState, mapDispatch)(CreateCarrierConnected);
export default CreateCarrier;
