import actionTypes from '../constants/action-types';

const initialState = {
  weights: null,
  weightsStatus: null,
};

const airReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRICES_AIR_RESET:
      return Object.assign({}, state, {
        weights: null,
        weightsStatus: null,
      });
    case actionTypes.PRICES_AIR_SUCCESS:
      return Object.assign({}, state, {
        weights: action.payload,
        weightsStatus: true,
      });
    case actionTypes.PRICES_AIR_ERROR:
      return Object.assign({}, state, {
        weights: null,
        weightsStatus: false,
      });
    default:
      return state;
  }
};

export default airReducer;
