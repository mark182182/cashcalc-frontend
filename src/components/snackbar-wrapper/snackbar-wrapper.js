import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { resetSnackbar } from '../../action/snackbar';

const mapDispatch = (dispatch) => {
  return {
    resetSnackbar: () => dispatch(resetSnackbar()),
  };
};

export const SnackbarWrapperConnected = (props) => {
  useEffect(() => {
    return () => {
      props.resetSnackbar();
    };
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.message !== null}
      autoHideDuration={4000}
      disableWindowBlurListener={true}
      onClose={props.resetSnackbar}
      TransitionComponent={(rest) => <Slide {...rest} direction="left" />}
    >
      {props.message !== null ? (
        <Alert severity={props.status}>{props.message}</Alert>
      ) : null}
    </Snackbar>
  );
};

const mapState = (state) => {
  return {
    isLoading: state.snackbarReducer.isLoading,
    status: state.snackbarReducer.status,
    message: state.snackbarReducer.message,
  };
};

const SnackbarWrapper = connect(
  mapState,
  mapDispatch
)(SnackbarWrapperConnected);
export default SnackbarWrapper;
