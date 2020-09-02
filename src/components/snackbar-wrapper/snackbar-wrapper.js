import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const SnackbarWrapper = (props) => {
  const handleAlert = () => {
    if (props.isLoading === true) {
      return <Alert severity="info">Betöltés...</Alert>;
    } else if (props.status === 'success') {
      return <Alert severity="success">{props.message}</Alert>;
    } else if (props.status === 'error') {
      return <Alert severity="error">{props.message}</Alert>;
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.isLoading === true || props.status !== null}
      autoHideDuration={4000}
      onClose={props.reset}
      TransitionComponent={(rest) => <Slide {...rest} direction="left" />}
    >
      {handleAlert()}
    </Snackbar>
  );
};
