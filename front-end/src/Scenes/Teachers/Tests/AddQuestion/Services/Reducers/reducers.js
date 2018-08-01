import {
  ADD_QUESTION_TAG,
  DELETE_QUESTION_TAG,
  RECEIVE_ADD_QUESTIONS,
  ERROR_ADD_QUESTIONS,
} from '../Actions/type';

const initialState = {
  tags: [],
  training: false,
  testSet: [],
  error: '',
  topics: [],
};
const addQuestion = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ADD_QUESTIONS: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case ERROR_ADD_QUESTIONS:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_QUESTION_TAG: {
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
    case DELETE_QUESTION_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default addQuestion;
