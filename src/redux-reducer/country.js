import actionTypes from '../constants/action-types';

const initialState = {
  countries: null,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRIES_RESET: {
      return Object.assign({}, state, {
        countries: null,
      });
    }
    case actionTypes.GET_COUNTRIES_AIR:
      return Object.assign({}, state, {
        countries: action.payload,
      });
    case actionTypes.GET_COUNTRIES_ROAD:
      return Object.assign({}, state, {
        countries: action.payload,
      });
    default:
      return state;
  }
};

export default countryReducer;
