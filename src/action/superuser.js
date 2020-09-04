import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ADMINS_RESET });
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.USERS_ADMINS)
      .then((resp) => {
        dispatch({
          type: actionTypes.GET_ADMINS_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_ADMINS_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetAdmins = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ADMINS_RESET });
  };
};

export const createAdmin = (username, password) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ADMIN_LOADING });
    return request
      .put(constants.BASE_URL + constants.API_ROUTES.USERS_ADMINS_CREATE, {
        username,
        password,
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.CREATE_ADMIN_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.CREATE_ADMIN_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetCreateStatus = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ADMIN_RESET });
  };
};

export const deleteAdmin = (admin) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ADMIN_LOADING });
    return request
      .delete(constants.BASE_URL + constants.API_ROUTES.USERS_ADMINS_DELETE, {
        params: {
          id: admin,
        },
      })
      .then((resp) => {
        dispatch({
          type: actionTypes.DELETE_ADMIN_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_ADMIN_ERROR,
          payload: err.message,
        });
      });
  };
};

export const resetDeleteStatus = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ADMIN_RESET });
  };
};
