import axios from 'axios';
import constants from '../constants/constants';
import store from '../store/store';
import { push } from 'connected-react-router';
import actionTypes from '../constants/action-types';

export const _store = store().store;
export const _persistor = store().persistor;
export const _history = store().history;

export const request = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  const state = _store.getState();
  config.headers['access-token'] = state.loginReducer.accessToken;
  config.headers['refresh-token'] = state.loginReducer.refreshToken;
  if (!config.url.includes(constants.API_ROUTES.IS_AUTHORIZED)) {
    _store.dispatch({ type: actionTypes.SNACKBAR_LOADING });
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response instanceof Error) {
      return Promise.reject(response);
    } else {
      /* 
        fallback for browsers that block third-party cookies,
        will switch to Storage Access API in the future  
        */
      if (
        response.headers['access-token'] &&
        response.headers['refresh-token']
      ) {
        _store.dispatch({
          type: actionTypes.SET_TOKENS,
          payload: {
            accessToken: response.headers['access-token'],
            refreshToken: response.headers['refresh-token'],
          },
        });
      }
      if (!response.config.url.includes(constants.API_ROUTES.IS_AUTHORIZED)) {
        _store.dispatch({ type: actionTypes.SNACKBAR_SUCCESS });
      }
      return response;
    }
  },
  (error) => {
    _store.dispatch({
      type: actionTypes.SNACKBAR_ERROR,
      payload: error.message,
    });
    switch (error.response.status) {
      case 401:
        if (_history.location.pathname !== '/login') {
          _store.dispatch({ type: actionTypes.LOGIN_USER_RESET });
          _store.dispatch(push(constants.ROUTES.LOGIN));
        }
        break;
      case 403:
        _store.dispatch(
          push(constants.ROUTES.HOME + constants.ROUTES.ERROR_403)
        );
        break;
      case 404:
        _store.dispatch(
          push(constants.ROUTES.HOME + constants.ROUTES.ERROR_404)
        );
        break;
      default:
        break;
    }
    return error;
  }
);

export default () => {
  return { store: _store, persistor: _persistor, history: _history };
};
