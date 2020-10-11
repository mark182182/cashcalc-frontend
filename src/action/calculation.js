import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import { request } from '../request/request';

export const calculate = (calc) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CALCULATE_START });
    return request
      .post(constants.BASE_URL + constants.API_ROUTES.CALC, calc)
      .then((resp) => {
        dispatch({
          type: actionTypes.CALCULATE_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CALCULATE_ERROR, payload: err.message });
      });
  };
};

export const calculationError = (message) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CALCULATE_VALIDATION_ERROR,
      payload: message,
    });
  };
};

export const resetCalculation = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CALCULATE_RESET });
  };
};
