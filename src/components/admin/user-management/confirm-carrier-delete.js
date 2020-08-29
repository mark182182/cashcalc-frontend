import React, { useEffect } from 'react';
import {
  Grid,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Check, Close } from '@material-ui/icons';
import { deleteCarrier } from '../../../action/admin';
import './carrier.scss';

const mapDispatch = (dispatch) => {
  return {
    deleteCarrier: (carrier) => dispatch(deleteCarrier(carrier)),
  };
};

const ConfirmCarrierDeleteConnected = (props) => {
  const handleDelete = () => {
    props.deleteCarrier(props.carrier);
  };

  useEffect(() => {
    return () => {
      props.reload();
    };
  }, []);

  useEffect(() => {
    if (props.carrierStatus) {
      props.close();
    }
  }, [props.carrierStatus]);

  return (
    <>
      <DialogTitle className="result-header">
        <Grid container>
          <Grid container justify="space-between">
            <Grid item>Megerősítés</Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Typography>
            Biztosan kívánja törölni a
            {
              <Typography className="confirm-delete-carrier-name">
                {props.carrier}
              </Typography>
            }
            felhasználót?
          </Typography>
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
            className="carrier-delete-button"
            onClick={handleDelete}
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

const ConfirmCarrierDelete = connect(
  mapState,
  mapDispatch
)(ConfirmCarrierDeleteConnected);
export default ConfirmCarrierDelete;
