import axios from 'axios';
import constants from '../constants/constants';
import { history } from '../store/store';

const request = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        history.push('/login');
        break;
      case 403:
        history.push('/main/403');
        break;
      case 404:
        history.push('/main/404');
        break;
      case 500:
        history.push('/main/500');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default request;
