import axios from 'axios';
import constants from '../constants/constants';
import { history } from '../store/store';

const request = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

export default request;
