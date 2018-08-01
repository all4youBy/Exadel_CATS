import * as types from '../Actions/types';

const initialState = {
  testSet: [],
  tags: [],
  topics: [],
  error: '',
};

const addTask = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TOPICS_ADD_TASK: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case types.ERROR_TOPICS_ADD_TASK: {
      return {
        ...state,
        error: action.payload,
      };
    }
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
