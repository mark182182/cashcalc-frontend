import axios from 'axios';
import constants from '../constants/constants';

const request = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 5000,
  withCredentials: true,
});