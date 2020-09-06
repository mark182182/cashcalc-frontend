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
import { deleteAdmin } from '../../action/superuser';
import './superuser.scss';

const mapDispatch = (dispatch) => {
  return {
    deleteAdmin: (admin) => dispatch(deleteAdmin(admin)),
  };
};

const ConfirmAdminDeleteConnected = (props) => {
  const handleDelete = () => {
    props.deleteAdmin(props.admin.id);
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
              <span className="confirm-delete-carrier-name">
                {props.admin.username}
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
            className="carrier-delete-button"
            onClick={props.close}
          >
            <Close />
          </IconButton>
          <IconButton
            aria-label="delete"
            className="carrier-delete-button"
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

const mapState = (state) => {
  return {
    deleteStatus: state.adminReducer.deleteStatus,
    deleteIsLoading: state.adminReducer.deleteIsLoading,
  };
};

const ConfirmAdminDelete = connect(
  mapState,
  mapDispatch
)(ConfirmAdminDeleteConnected);
export default ConfirmAdminDelete;
