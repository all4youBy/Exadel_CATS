import * as types from '../Actions/types';

const initialState = {
  tests: null,
};

const userPassedTests = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_PASSED_TESTS: {
      const d = new Date();
      const tests = action.payload.filter(item => new Date(item.deadline) < d);
      return { ...state, tests };
    }
    default:
      return state;
  }
};

export default userPassedTests;
