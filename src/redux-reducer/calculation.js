import actionTypes from '../constants/action-types';

const initialState = {
  isLoading: null,
  result: null,
  message: null,
  status: null,
};

const calcReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALCULATE_START:
      return Object.assign({}, state, {
        isLoading: true,
        result: null,
        message: null,
        status: null,
      });
    case actionTypes.CALCULATE_RESET:
      return Object.assign({}, state, {
        isLoading: null,
        result: null,
        message: null,
        status: null,
      });
    case actionTypes.CALCULATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        result: action.payload,
        status: 'success',
        message: 'Sikeres művelet!',
      });
    case actionTypes.CALCULATE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        result: null,
        status: 'error',
        message: 'Hiba történt a betöltés közben!',
      });
    case actionTypes.CALCULATE_VALIDATION_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        result: null,
        status: 'error',
        message: action.payload,
      });
    default:
      return state;
  }
};

export default calcReducer;
