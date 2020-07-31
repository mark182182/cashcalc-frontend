import axios from 'axios';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER_RESET });
    return axios
      .post(
        constants.BASE_URL + constants.API_ROUTES.LOGIN,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        dispatch({
          type: actionTypes.LOGIN_USER_SUCCESS,
          payload: resp.data,
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
