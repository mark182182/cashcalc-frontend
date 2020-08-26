import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER_START });
    return request
      .post(constants.API_ROUTES.LOGIN, {
        username,
        password,
      })
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
