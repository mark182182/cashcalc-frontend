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

export default (preloadedState) => {
  const middlewares = [routerMiddleware(history), thunk];

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    persistReducer(persistConfig, rootReducer(history)),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  request.interceptors.response.use(
    (response) => response,
    (error) => {
      switch (error.response.status) {
        case 401:
          store.dispatch({ type: actionTypes.LOGIN_USER_RESET });
          store.dispatch(push(constants.ROUTES.LOGIN));
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
        case 500:
          store.dispatch(
            push(constants.ROUTES.HOME + constants.ROUTES.ERROR_500)
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
