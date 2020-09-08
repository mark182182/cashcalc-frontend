import React from 'react';
import { connect } from 'react-redux';
import { Snackbar, Slide, Portal } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { resetSnackbar } from '../../action/snackbar';

const mapDispatch = (dispatch) => {
  return {
    resetSnackbar: () => dispatch(resetSnackbar()),
  };
};

export const SnackbarWrapperConnected = (props) => {
  const handleClose = (event, object) => {
    if (event === null && object === 'timeout') {
      props.resetSnackbar();
    }
  };

  const snackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.message !== null}
        autoHideDuration={4000}
        disableWindowBlurListener={true}
        onClose={handleClose}
        TransitionComponent={(rest) => <Slide {...rest} direction="left" />}
        className="snackbar"
      >
        {props.message !== null ? (
          <Alert severity={props.status}>{props.message}</Alert>
        ) : null}
      </Snackbar>
    );
  };

  return (
    <>
      {/* This elevates the Snackbar when a dialog window is present */}
      {document.querySelector('.MuiDialog-root') ? (
        <Portal>{snackbar()}</Portal>
      ) : (
        snackbar()
      )}
    </>
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
