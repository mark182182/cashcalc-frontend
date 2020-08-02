import actionTypes from '../constants/action-types';

const initialState = {
  isLoading: null,
  result: null,
};

const calcReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALCULATE_RESET:
      return Object.assign({}, state, {
        isLoading: true,
        result: null,
      });
    case actionTypes.CALCULATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        result: action.payload,
      });
    case actionTypes.CALCULATE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        result: null,
      });
    default:
      return state;
  }
};

export default calcReducer;
