import axios from 'axios';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

export const getCountriesRoad = () => {
  return (dispatch) => {
    return axios
      .get(constants.BASE_URL + constants.API_ROUTES.COUNTRIES_ROAD, {
        withCredentials: true,
      })
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
    return axios
      .get(constants.BASE_URL + constants.API_ROUTES.COUNTRIES_AIR, {
        withCredentials: true,
      })
      .then((resp) => {
        dispatch({ type: actionTypes.GET_COUNTRIES_AIR, payload: resp.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
