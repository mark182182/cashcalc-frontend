import actionTypes from '../constants/action-types';

const initialState = {
  weights: null,
  weightsStatus: null,
};

const roadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRICES_ROAD_RESET:
      return Object.assign({}, state, {
        weights: null,
        weightsStatus: null,
      });
    case actionTypes.PRICES_ROAD_SUCCESS:
      return Object.assign({}, state, {
        weights: action.payload,
        weightsStatus: true,
      });
    case actionTypes.PRICES_ROAD_ERROR:
      return Object.assign({}, state, {
        weights: null,
        weightsStatus: false,
      });
    default:
      return state;
  }
};

export default roadReducer;
