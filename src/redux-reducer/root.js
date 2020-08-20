import { combineReducers } from 'redux';
import airReducer from './air';
import roadReducer from './road';
import countryReducer from './country';
import loginReducer from './login';
import calcReducer from './calculation';

export default combineReducers({
  airReducer,
  roadReducer,
  countryReducer,
  calcReducer,
  loginReducer,
});
