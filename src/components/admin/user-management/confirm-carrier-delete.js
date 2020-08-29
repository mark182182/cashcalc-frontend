import React from 'react';
import {
  Grid,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import './carrier.scss';

export const ConfirmCarrierDelete = (props) => {
  const handleDelete = () => {
    props.deleteCarrier(props.carrier);
  };

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
