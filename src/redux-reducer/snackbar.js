import actionTypes from '../constants/action-types';

const initialState = {
  isLoading: null,
  status: null,
  message: null,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SNACKBAR_RESET:
      return Object.assign({}, state, {
        isLoading: null,
        status: null,
        message: null,
      });
    case actionTypes.SNACKBAR_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        status: 'info',
        message: 'Betöltés...',
      });
    case actionTypes.SNACKBAR_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        status: 'success',
        message: 'Sikeres művelet!',
      });
    case actionTypes.SNACKBAR_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        status: 'error',
        message: action.payload,
      });
    default:
      return state;
  }
};

export default snackbarReducer;
