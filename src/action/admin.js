import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import request from '../request/request';

export const validateRole = (role) => {
  return (dispatch) => {
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
        dispatch({ type: actionTypes.PRICES_AIR_ERROR, payload: err.message });
      });
  };
};
