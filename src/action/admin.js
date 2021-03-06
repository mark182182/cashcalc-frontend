import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import { request } from '../request/request';

export const validateRole = (role) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTHORIZATION_RESET });
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.IS_AUTHORIZED, {
        params: { role: role },
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.AUTHORIZATION_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTHORIZATION_ERROR,
          payload: err.message,
        });
      });
  };
};

export const getPricingVariables = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PRICINGVARIABLES_RESET });
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.PRICING_VARIABLES)
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_PRICINGVARIABLES_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_PRICINGVARIABLES_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetPricingVariables = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PRICINGVARIABLES_RESET });
  };
};

export const updatePricingVariables = (pricing) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PRICINGVARIABLES_RESET });
    return request
      .patch(
        constants.BASE_URL + constants.API_ROUTES.PRICING_VARIABLES_UPDATE,
        pricing
      )
      .then((resp) => {
        dispatch({
          type: actionTypes.UPDATE_PRICINGVARIABLES_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_PRICINGVARIABLES_ERROR,
          payload: err.message,
        });
      });
  };
};

export const getCarriers = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CARRIERS_RESET });
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.USERS_CARRIERS)
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_CARRIERS_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_CARRIERS_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetCarriers = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CARRIERS_RESET });
  };
};

export const createCarrier = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_CARRIER_LOADING });
    return request
      .put(constants.BASE_URL + constants.API_ROUTES.USERS_CARRIERS_CREATE, {
        username,
        password,
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.CREATE_CARRIER_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.CREATE_CARRIER_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetCreateStatus = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_CARRIER_RESET });
  };
};

export const deleteCarrier = (carrier) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CARRIER_LOADING });
    return request
      .delete(constants.BASE_URL + constants.API_ROUTES.USERS_CARRIERS_DELETE, {
        params: {
          id: carrier,
        },
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.DELETE_CARRIER_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_CARRIER_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetDeleteStatus = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CARRIER_RESET });
  };
};

export const getUsernames = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USERNAMES_RESET });
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.GET_USERNAMES)
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_USERNAMES_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_USERNAMES_ERROR,
          payload: err.message,
        });
      });
  };
};
