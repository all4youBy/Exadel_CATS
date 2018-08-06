import * as types from '../Actions/types';

const initialState = {
  topic: '',
  topics: [],
};

const trainingTest = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TRAINING_TOPIC: {
      return {
        ...state,
        topic: action.payload.id,
      };
    }
    case types.RECEIVE_TOPICS_TRAINING_TEST: {
      return {
        ...state,
        topics: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default trainingTest;
