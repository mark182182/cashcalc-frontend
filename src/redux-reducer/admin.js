import actionTypes from '../constants/action-types';

const initialState = {
  isAuthorized: null,
  pricings: null,
  pricingStatus: null,
  updateStatus: null,
  carriers: null,
  carrierLoading: null,
  createStatus: null,
  isCreateLoading: null,
  deleteStatus: null,
  isDeleteLoading: null,
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
        createStatus: null,
        isCreateLoading: true,
      });
    case actionTypes.CREATE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        createStatus: true,
        isCreateLoading: false,
      });
    case actionTypes.CREATE_CARRIER_ERROR:
      return Object.assign({}, state, {
        createStatus: false,
        isCreateLoading: false,
      });
    case actionTypes.DELETE_CARRIER_RESET:
      return Object.assign({}, state, {
        deleteCarrier: null,
        isDeleteLoading: true,
      });
    case actionTypes.DELETE_CARRIER_SUCCESS:
      return Object.assign({}, state, {
        deleteCarrier: true,
        isDeleteLoading: false,
      });
    case actionTypes.DELETE_CARRIER_ERROR:
      return Object.assign({}, state, {
        deleteCarrier: false,
        isDeleteLoading: false,
      });
    default:
      return state;
  }
};

export default adminReducer;
