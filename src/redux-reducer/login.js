import actionTypes from '../constants/action-types';

const initialState = {
  isLoading: null,
  status: null,
  message: null,
  role: null,
  accessToken: null,
  refreshToken: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_RESET:
      return Object.assign({}, state, {
        isLoading: null,
        status: null,
        message: null,
        role: null,
        accessToken: null,
        refreshToken: null,
      });
    case actionTypes.LOGIN_USER_START:
      return Object.assign({}, state, {
        isLoading: true,
        status: null,
        message: null,
        role: null,
        accessToken: null,
        refreshToken: null,
      });
    case actionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        status: 'success',
        message: action.payload.message,
        role: action.payload.role,
      });
    case actionTypes.LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        status: 'error',
        message: action.payload,
        role: null,
        accessToken: null,
        refreshToken: null,
      });
    case actionTypes.SET_TOKENS:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    default:
      return state;
  }
};

export default loginReducer;
