import { React, useEffect } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const SnackBarWrapper = (props) => {
  useEffect(() => {
    return () => {
      props.reset();
    };
  }, []);

  return (
    props.isLoading !== null && (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        open={true}
        onClose={props.reset}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        {props.isLoading === true && (
          <Alert severity={'info'}>Loading...</Alert>
        )}
        {props.isLoading === false && (
          <Alert severity={props.status}>{props.message}</Alert>
        )}
      </Snackbar>
    )
  );
};
