import axios from 'axios';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

export const calculate = (calc) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CALCULATE_RESET });
    return axios
      .post(constants.BASE_URL + constants.API_ROUTES.CALC, calc, {
        withCredentials: true,
      })
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