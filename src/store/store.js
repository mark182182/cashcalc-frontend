import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../redux-reducer/root';

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

  return { store, persistor };
};
