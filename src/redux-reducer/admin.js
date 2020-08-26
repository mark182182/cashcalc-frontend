import actionTypes from '../constants/action-types';

const initialState = {
  isAuthorized: null,
  pricing: null,
  pricingStatus: null,
  updateStatus: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZATION_RESET:
      return Object.assign({}, state, {
        isAuthorized: null,
      });
    case actionTypes.AUTHORIZATION_SUCCESS:
      return Object.assign({}, state, {
        isAuthorized: true,
      });
    case actionTypes.AUTHORIZATION_ERROR:
      return Object.assign({}, state, {
        isAuthorized: false,
      });
    case actionTypes.GET_PRICINGVARIABLES_RESET:
      return Object.assign({}, state, {
        pricing: null,
        pricingStatus: null,
      });
    case actionTypes.GET_PRICINGVARIABLES_SUCCESS:
      return Object.assign({}, state, {
        pricing: action.payload,
        pricingStatus: true,
      });
    case actionTypes.GET_PRICINGVARIABLES_ERROR:
      return Object.assign({}, state, {
        pricing: null,
        pricingStatus: false,
      });
    case actionTypes.UPDATE_PRICINGVARIABLES_RESET:
      return Object.assign({}, state, {
        updateStatus: null,
      });
    case actionTypes.UPDATE_PRICINGVARIABLES_SUCCESS:
      return Object.assign({}, state, {
        updateStatus: true,
      });
    case actionTypes.UPDATE_PRICINGVARIABLES_ERROR:
      return Object.assign({}, state, {
        updateStatus: false,
      });
    default:
      return state;
  }
};

export default adminReducer;
