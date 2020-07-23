import axios from 'axios';
import CONSTANTS from '../constants/constants';
import { actionTypes } from '../constants/action-types';

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER_RESET });
    return axios
      .post(CONSTANTS.BASE_URL + CONSTANTS.API_ROUTES.LOGIN, {
        username,
        password,
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.LOGIN_USER_SUCCESS,
          payload: resp.data.message,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOGIN_USER_ERROR, payload: err.message });
      });
  };
};

export const resetUser = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER_RESET });
  };
};
