import axios from 'axios';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

export const getPricesRoad = (zoneNumber) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.PRICES_ROAD_RESET });
    return axios
      .get(
        constants.BASE_URL +
          constants.API_ROUTES.PRICINGS_ROAD_FARES +
          zoneNumber,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        dispatch({
          type: actionTypes.PRICES_ROAD_SUCCESS,
          payload: resp.data,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.PRICES_ROAD_ERROR, payload: err.message });
      });
  };
};

export const resetPrices = () => {
  return dispatch => {
    dispatch({type: actionTypes.PRICES_ROAD_RESET});
  }
}