import actionTypes from '../constants/action-types';

const initialState = {
  isAuthorized: null,
  pricings: null,
  pricingsStatus: null,
  updateStatus: null,
  carriers: null,
  carrierLoading: null,
  createStatus: null,
  deleteStatus: null,
  deleteIsLoading: null,
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
        pricingsStatus: null,
      });
    case actionTypes.GET_PRICINGVARIABLES_SUCCESS:
      return Object.assign({}, state, {
        pricings: action.payload,
        pricingsStatus: true,
      });
    case actionTypes.GET_PRICINGVARIABLES_ERROR:
      return Object.assign({}, state, {
        pricings: null,
        pricingsStatus: false,
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
    case actionTypes.CREATE_CARRIER_LOADING:
      return Object.assign({}, state, {
        createStatus: null,
        createIsLoading: true,
      });
    case actionTypes.CREATE_CARRIER_RESET:
      return Object.assign({}, state, {
        createStatus: null,
        createIsLoading: null,
      });
    case actionTypes.CREATE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        createStatus: true,
        createIsLoading: false,
      });
    case actionTypes.CREATE_CARRIER_ERROR:
      return Object.assign({}, state, {
        createStatus: false,
        createIsLoading: false,
      });
    case actionTypes.DELETE_CARRIER_LOADING:
      return Object.assign({}, state, {
        deleteStatus: null,
        deleteIsLoading: true,
      });
    case actionTypes.DELETE_CARRIER_RESET:
      return Object.assign({}, state, {
        deleteStatus: null,
        deleteIsLoading: null,
      });
    case actionTypes.DELETE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        deleteStatus: true,
        deleteIsLoading: false,
      });
    case actionTypes.DELETE_CARRIER_ERROR:
      return Object.assign({}, state, {
        deleteStatus: false,
        deleteIsLoading: false,
      });
    default:
      return state;
  }
};

export default adminReducer;
