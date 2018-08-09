import * as types from '../Actions/types';

const initialState = {
  testSet: [],
  tags: [],
  topics: [],
  error: '',
  response: '',
};

const addTask = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ADD_TASK: {
      return {
        ...state,
        response: action.payload,
      };
    }
    case types.CLEAR_TAGS_ADD_TASK: {
      return {
        ...state,
        tags: [],
        testSet: [],
      };
    }
    case types.ERROR_ADD_TASK: {
      return {
        ...state,
        error: action.payload,
      };
    }
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
            key: state.testSet.length,
          },
        ],
      };
    }
    case types.DELETE_IN_OUT_SET: {
      // const setsLength = state.testSet;
      console.log(action.payload, 222);
      let elemIndex = null;
      const arr = state.testSet.forEach((element, index) => {
        if (element.key === action.payload) {
          elemIndex = index;
        }
      });
      state.testSet.splice(elemIndex, 1);
      console.log(arr, 1111);
      return {
        ...state,
        testSet: [
          ...state.testSet,
        ],
      };
    }
    case types.ADD_TASK_TAG: {
      if (state.tags.includes(action.payload)) {
        return { ...state };
      }
      if (!action.payload) {
        return { ...state };
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
        tags: state.tags.filter(tag => tag.text !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default addTask;
