import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import airReducer from './air';
import roadReducer from './road';
import countryReducer from './country';
import loginReducer from './login';
import calcReducer from './calculation';
import adminReducer from './admin';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    airReducer,
    roadReducer,
    countryReducer,
    calcReducer,
    loginReducer,
    adminReducer,
  });

export default rootReducer;
