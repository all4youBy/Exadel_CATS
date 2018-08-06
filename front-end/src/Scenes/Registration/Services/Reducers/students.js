import * as types from '../Actions/types';

const initialState = [];

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_REGISTRATED_STUDENT: {
      return [
        ...state,
        action.payload,
      ];
    }
    default: {
      return state;
    }
  }
};

export default studentReducer;
