import * as types from '../Actions/types';

const initialState = {
  data: [],
};

const completeTest = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TEST_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default completeTest;
