import * as types from '../Actions/types';

const initialState = {
  data: null,
  error: false,
};

const completeTest = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TEST_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case types.ERROR_TEST_DATA:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default completeTest;
