import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../redux-reducer/root';
import request from '../request/request';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  // 401 redirect to login
  // 403 redirect to static unauthorized page

  request.interceptors.response.use(
    (response) => response,
    (error) => {
      switch (error.status) {
        case 401:
          console.log('401');
          // store.dispatch({ type: actionTypes.ERROR_401});
          break;
        case 403:
          console.log('403');
          break;
        case 404:
          console.log('404');
          break;
        case 500:
          console.log('500');
          break;
        default:
          break;
      }
    }
  );

  return { store, persistor };
};
