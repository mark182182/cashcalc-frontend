import actionTypes from '../constants/action-types';

const initialState = {
  admins: null,
  adminLoading: null,
  createStatus: null,
  deleteStatus: null,
  deleteIsLoading: null,
};

const superuserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMINS_RESET:
      return Object.assign({}, state, {
        admins: null,
        adminLoading: true,
      });
    case actionTypes.GET_ADMINS_SUCCESS:
      return Object.assign({}, state, {
        admins: action.payload,
        adminLoading: false,
      });
    case actionTypes.GET_ADMINS_ERROR:
      return Object.assign({}, state, {
        admins: null,
        adminLoading: false,
      });
    case actionTypes.CREATE_ADMIN_LOADING:
      return Object.assign({}, state, {
        createStatus: null,
        createIsLoading: true,
      });
    case actionTypes.CREATE_ADMIN_RESET:
      return Object.assign({}, state, {
        createStatus: null,
        createIsLoading: null,
      });
    case actionTypes.CREATE_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        createStatus: true,
        createIsLoading: false,
      });
    case actionTypes.CREATE_ADMIN_ERROR:
      return Object.assign({}, state, {
        createStatus: false,
        createIsLoading: false,
      });
    case actionTypes.DELETE_ADMIN_LOADING:
      return Object.assign({}, state, {
        deleteStatus: null,
        deleteIsLoading: true,
      });
    case actionTypes.DELETE_ADMIN_RESET:
      return Object.assign({}, state, {
        deleteStatus: null,
        deleteIsLoading: null,
      });
    case actionTypes.DELETE_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        deleteStatus: true,
        deleteIsLoading: false,
      });
    case actionTypes.DELETE_ADMIN_ERROR:
      return Object.assign({}, state, {
        deleteStatus: false,
        deleteIsLoading: false,
      });
    default:
      return state;
  }
};

export default superuserReducer;
