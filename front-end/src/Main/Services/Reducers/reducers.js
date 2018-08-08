/* eslint-disable no-unused-vars */
import * as types from '../Actions/types';

const initialState = {
  userType: 'guest',
  isAuth: false,
  isReady: true,
  error: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    /* case types.IS_LOGGED_IN: {
      return {
        ...state,
        userType: 'student',
        isAuth: true,
        isReady: true,
      };
    } */
    case types.PAGE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default app;
