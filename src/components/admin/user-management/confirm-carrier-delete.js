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
    if (props.deleteStatus === true && props.isDeleteLoading === false) {
      props.close();
      props.reload();
    }
  }, [props.deleteStatus]);

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
          <Typography> Biztosan kívánja törölni a</Typography>
          <Typography className="confirm-delete-carrier-name">
            {props.carrier}
          </Typography>
          <Typography> felhasználót?</Typography>
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
            disabled={props.isDeleteLoading === true}
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
    deleteStatus: state.adminReducer.deleteStatus,
    isDeleteLoading: state.adminReducer.isDeleteLoading,
  };
};

const ConfirmCarrierDelete = connect(
  mapState,
  mapDispatch
)(ConfirmCarrierDeleteConnected);
export default ConfirmCarrierDelete;
