import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';

export const logout = () => {
  return (dispatch) => {
    return request
      .post(constants.BASE_URL + constants.API_ROUTES.LOGOUT)
      .then((resp) => {
        dispatch({ type: actionTypes.LOGIN_USER_RESET });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOGOUT_USER_ERROR, payload: err.message });
      });
  };
};
