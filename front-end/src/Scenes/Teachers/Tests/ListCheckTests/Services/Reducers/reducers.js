import * as types from '../Actions/types';

const initialState = {
  questionList: (+JSON.parse(localStorage.getItem('checkTests')) > 0) ? JSON.parse(localStorage.getItem('checkTests')) : null,
};

const checkQuestions = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_QUESTIONS_TO_CHECK: {
      localStorage.setItem('checkTests', action.payload.length);
      return {
        ...state,
        questionList: [...action.payload],
      };
    }
    case types.DELETE_MANUAL_ANSWER: {
      return {
        ...state,
        questionList: state.questionList.filter(item => item !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export default checkQuestions;
