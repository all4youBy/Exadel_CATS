// import * as types from '../Actions/types';

import * as types from '../../../../Tasks/AddTask/Services/Actions/types';

const initialState = {
  tags: [],
  training: false,
  testSet: [],
};
const addQuestion = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION_TAG': {
      if (state.tags.includes(action.payload)) {
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
    case 'DELETE_QUESTION_TAG': {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    case 'ADD_QUESTION_LEVEL': {
      return {
        ...state,
        level: action.payload,
      };
    }
    case 'ADD_QUESTION_TYPE': {
      return {
        ...state,
        training: action.payload,
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
    default:
      return state;
  }
};

export default addQuestion;
