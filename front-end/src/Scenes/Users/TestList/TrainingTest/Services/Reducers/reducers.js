import * as types from '../Actions/types';

const initialState = {
  topic: '',
};

const trainingTest = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TRAINING_TOPIC: {
      return {
        topic: action.payload.id,
      };
    }
    default: {
      return state;
    }
  }
};

export default trainingTest;
