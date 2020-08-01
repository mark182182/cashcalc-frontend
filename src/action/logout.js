import axios from 'axios';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

export const logout = () => {
  return (dispatch) => {
    return axios
      .post(
        constants.BASE_URL + constants.API_ROUTES.LOGOUT,
        {},
        { withCredentials: true }
      )
      .then((resp) => {
        dispatch({ type: actionTypes.LOGIN_USER_RESET });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOGOUT_USER_ERROR, payload: err.message });
      });
  };
};
