import * as types from '../Actions/types';

const initialState = {
  testSet: [],
  tags: [],
};

const addTask = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_IN_OUT_SET: {
      return {
        ...state,
        testSet: [
          ...state.testSet,
          {
            in: '',
            out: '',
          },
        ],
      };
    }
    case types.ADD_TASK_TAG: {
      if (state.tags.includes(action.payload) || action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload,
        ],
      };
    }
    case types.DELETE_TASK_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default addTask;
