import axios from 'axios';
import CONSTANTS from '../constants/constants';
import { actionTypes } from '../constants/action-types';

export const getCountries = (type) => {
  return (dispatch) => {
    if (!Object.values(actionTypes).includes(type)) {
      throw new Error('hopika');
    }

    return axios
      .get(CONSTANTS.BASE_URL + type)
      .then((resp) => {
        dispatch({ type, payload: resp.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
