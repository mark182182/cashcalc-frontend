import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../redux-reducer/root';
import { push } from 'connected-react-router';
import request from '../request/request';
import constants from '../constants/constants';
import actionTypes from '../constants/action-types';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
};

export const history = createBrowserHistory();

export default () => {
  const middlewares = [routerMiddleware(history), thunk];

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  request.interceptors.request.use((config) => {
    if (!config.url.includes(constants.API_ROUTES.IS_AUTHORIZED)) {
      store.dispatch({ type: actionTypes.SNACKBAR_LOADING });
    }
    return config;
  });

  request.interceptors.response.use(
    (response) => {
      if (response instanceof Error) {
        return Promise.reject(response);
      } else {
        if (!response.config.url.includes(constants.API_ROUTES.IS_AUTHORIZED)) {
          store.dispatch({ type: actionTypes.SNACKBAR_SUCCESS });
        }
        if (document.requestStorageAccess) {
          return document.requestStorageAccess().then(
            () => {
              return response;
            },
            () => {
              store.dispatch({
                type: actionTypes.SNACKBAR_ERROR,
                payload: 'Hozzáférées megtagadva!',
              });
            }
          );
        } else {
          return response;
        }
      }
    },
    (error) => {
      store.dispatch({
        type: actionTypes.SNACKBAR_ERROR,
        payload: error.message,
      });
      switch (error.response.status) {
        case 401:
          if (history.location.pathname !== '/login') {
            store.dispatch({ type: actionTypes.LOGIN_USER_RESET });
            store.dispatch(push(constants.ROUTES.LOGIN));
          }
          break;
        case 403:
          store.dispatch(
            push(constants.ROUTES.HOME + constants.ROUTES.ERROR_403)
          );
          break;
        case 404:
          store.dispatch(
            push(constants.ROUTES.HOME + constants.ROUTES.ERROR_404)
          );
          break;
        default:
          break;
      }
      return error;
    }
  );

  return { store, persistor };
};
