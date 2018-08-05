import * as types from '../Actions/types';

const initialState = {
  questionList: [],
};

const checkQuestions = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_QUESTIONS_TO_CHECK: {
      return {
        ...state,
        questionList: [...state.questionList, ...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default checkQuestions;
