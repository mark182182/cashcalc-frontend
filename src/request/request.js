import axios from 'axios';
import constants from '../constants/constants';

const request = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

export default request;
