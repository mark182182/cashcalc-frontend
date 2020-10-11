import constants from '../constants/constants';
import actionTypes from '../constants/action-types';
import { request } from '../request/request';

export const getCountriesRoad = () => {
  return (dispatch) => {
    return request
      .get(constants.BASE_URL + constants.API_ROUTES.COUNTRIES_ROAD)
      .then((resp) => {
        dispatch({ type: actionTypes.GET_COUNTRIES_ROAD, payload: resp.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const getCountriesAir = () => {
  return (dispatch) => {
    return request
      .get(constants.API_ROUTES.COUNTRIES_AIR)
      .then((resp) => {
        dispatch({ type: actionTypes.GET_COUNTRIES_AIR, payload: resp.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const resetCountry = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_COUNTRIES_RESET });
  };
};
