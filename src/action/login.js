import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';
import { push } from 'connected-react-router';

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
        if (err.response && err.response.status === 500) {
          dispatch({ type: actionTypes.LOGIN_USER_RESET });
          dispatch(push(constants.ROUTES.LOGIN));
        } else {
          dispatch({
            type: actionTypes.LOGIN_USER_ERROR,
            payload: err.response.data.error,
          });
        }
      });
  };
};

export const resetUser = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_USER_RESET });
  };
};
