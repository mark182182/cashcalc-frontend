import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../redux-reducer/root';
import { push } from 'connected-react-router';
import request from '../request/request';

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
          store.dispatch(push('/login'));
          break;
        case 403:
          store.dispatch(push('/main/403'));
          break;
        case 404:
          store.dispatch(push('/main/404'));
          break;
        case 500:
          store.dispatch(push('/main/500'));
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );

  return { store, persistor };
};
