import { combineReducers } from 'redux';
import airReducer from './air';
import countryReducer from './country';
import loginReducer from './login';

export default combineReducers({ airReducer, countryReducer, loginReducer });
