import actionTypes from '../constants/action-types';

export const resetSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SNACKBAR_RESET });
  };
};

export const snackbarLoading = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SNACKBAR_LOADING });
  };
};

export const snackbarSuccess = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SNACKBAR_SUCCESS });
  };
};

export const snackbarError = (message) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SNACKBAR_ERROR, payload: message });
  };
};
