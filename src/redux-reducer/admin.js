import actionTypes from '../constants/action-types';

const initialState = {
  isAuthorized: null,
  pricings: null,
  pricingStatus: null,
  updateStatus: null,
  carriers: null,
  carrierLoading: null,
  carrierStatus: null,
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
        pricings: null,
        pricingStatus: null,
      });
    case actionTypes.GET_PRICINGVARIABLES_SUCCESS:
      return Object.assign({}, state, {
        pricings: action.payload,
        pricingStatus: true,
      });
    case actionTypes.GET_PRICINGVARIABLES_ERROR:
      return Object.assign({}, state, {
        pricings: null,
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
    case actionTypes.GET_CARRIERS_RESET:
      return Object.assign({}, state, {
        carriers: null,
        carrierLoading: true,
      });
    case actionTypes.GET_CARRIERS_SUCCESS:
      return Object.assign({}, state, {
        carriers: action.payload,
        carrierLoading: false,
      });
    case actionTypes.GET_CARRIERS_ERROR:
      return Object.assign({}, state, {
        carriers: null,
        carrierLoading: false,
      });
    case actionTypes.CREATE_CARRIER_RESET:
      return Object.assign({}, state, {
        carrierStatus: null,
      });
    case actionTypes.CREATE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        carrierStatus: true,
      });
    case actionTypes.CREATE_CARRIER_ERROR:
      return Object.assign({}, state, {
        carrierStatus: false,
      });
    case actionTypes.DELETE_CARRIER_RESET:
      return Object.assign({}, state, {
        carrierStatus: null,
      });
    case actionTypes.DELETE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        carrierStatus: true,
      });
    case actionTypes.DELETE_CARRIER_ERROR:
      return Object.assign({}, state, {
        carrierStatus: false,
      });
    default:
      return state;
  }
};

export default adminReducer;
