import actionTypes from '../constants/action-types';

const initialState = {
  status: 500,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_ERROR:
      return Object.assign({}, state, {
        status: null,
      });
    case actionTypes.ERROR_401:
      return Object.assign({}, state, {
        status: 401,
      });
    case actionTypes.ERROR_403:
      return Object.assign({}, state, {
        status: 403,
      });
    case actionTypes.ERROR_404:
      return Object.assign({}, state, {
        status: 404,
      });
    case actionTypes.ERROR_500:
      return Object.assign({}, state, {
        status: 500,
      });
    default:
      return state;
  }
};

export default errorReducer;
