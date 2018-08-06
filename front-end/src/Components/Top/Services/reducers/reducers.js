import * as types from '../actions/types';

const initialState = {
  topBySum: [],
  topByTask: [],
  topByActivity: [],
};

const topReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENT_TOP_BY_SUM: {
      return {
        ...state,
        topBySum: [...state.topBySum, action.payload],
      };
    }
    case types.RECEIVE_STUDENT_TOP_BY_TASK: {
      return {
        ...state,
        topByTask: [...state.topByTask, action.payload],
      };
    }
    case types.RECEIVE_STUDENT_TOP_BY_ACTIVITY: {
      return {
        ...state,
        topByActivity: [...state.topByActivity, action.topByActivity],
      };
    }
    default: {
      return state;
    }
  }
};

export default topReducer;
