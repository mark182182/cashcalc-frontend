import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';

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
