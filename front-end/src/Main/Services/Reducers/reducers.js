import * as types from '../Actions/types';

const initialState = {
  userType: 'guest',
  isAuth: false,
  isReady: true,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGGED_IN: {
      return {
        ...state,
        userType: 'student',
        isAuth: true,
        isReady: true,
      };
    }
    default:
      return state;
  }
};

export default app;
