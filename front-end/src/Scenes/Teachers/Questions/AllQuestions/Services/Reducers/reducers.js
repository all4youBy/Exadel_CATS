import * as types from '../Actions/types';

const initialState = {
  questions: [],
  error: '',
};

const allQuestions = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ALL_QUESTIONS: {
      return {
        ...state,
        questions: [...action.payload],
      };
    }
    case types.ERROR_ALL_QUESTIONS:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default allQuestions;
