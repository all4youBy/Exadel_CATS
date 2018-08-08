import * as types from '../actions/types';

const initialState = {
  topBySum: [],
  topByTests: [],
  topByActivity: [],
};

const topReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENT_TOP_BY_SUM: {
      return {
        ...state,
        topBySum: (action.payload || []).slice(0, 5),
      };
    }
    case types.RECEIVE_STUDENT_TOP_BY_TESTS: {
      console.log(action.payload);
      return {
        ...state,
        topByTests: (action.payload || []).slice(0, 5),
      };
    }
    case types.RECEIVE_STUDENT_TOP_BY_ACTIVITY: {
      return {
        ...state,
        topByActivity: (action.payload || []).slice(0, 5),
      };
    }
    default: {
      return state;
    }
  }
};

export default topReducer;
