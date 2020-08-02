import { combineReducers } from 'redux';
import airReducer from './air';
import countryReducer from './country';
import loginReducer from './login';
import calcReducer from './calculation';

export default combineReducers({
  airReducer,
  countryReducer,
  calcReducer,
  loginReducer,
});
