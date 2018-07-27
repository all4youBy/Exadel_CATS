import { ADD_QUESTION_TAG, DELETE_QUESTION_TAG } from '../Actions/type';

const initialState = {
  tags: [],
  training: false,
  testSet: [],
};
const addQuestion = (state = initialState, action) => {
  switch (action.type) {
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
