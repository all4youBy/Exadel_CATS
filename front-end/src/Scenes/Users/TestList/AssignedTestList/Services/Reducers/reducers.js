import * as types from '../Actions/types';

const initialState = {
  tests: null,
  error: '',
};

const userAssignedTests = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TESTS_ASSIGNED_TO_USER: {
      const d = new Date();
      const tests = action.payload.filter(item => new Date(item.deadline) > d);
      return { ...state, tests };
    }
    default:
      return state;

    case types.ERROR_STUDENTS_BY_GROUP:
      return {
        ...state,
        error: action.payload,
      };
  }
};

export default userAssignedTests;
