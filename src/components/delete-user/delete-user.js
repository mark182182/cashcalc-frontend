import React, { useEffect } from 'react';
import {
  Grid,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import './delete-user.scss';

export const DeleteUser = (props) => {
  const handleDelete = () => {
    props.deleteUser(props.user.id);
  };

  useEffect(() => {
    if (props.deleteStatus === true || props.deleteIsLoading === false) {
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
          <Typography>
            Biztosan kívánja törölni a{' '}
            {
              <span className="confirm-delete-user-name">
                {props.user.username}
              </span>
            }{' '}
            felhasználót?
          </Typography>
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
            className="user-delete-button"
            onClick={handleDelete}
            disabled={props.deleteIsLoading === true}
          >
            <Check />
          </IconButton>
        </DialogActions>
      </DialogActions>
    </>
  );
};
