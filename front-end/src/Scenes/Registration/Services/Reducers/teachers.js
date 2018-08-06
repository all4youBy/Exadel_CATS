import * as types from '../Actions/types';

const initialState = [];

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_REGISTRATED_TEACHER: {
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

export default teacherReducer;
