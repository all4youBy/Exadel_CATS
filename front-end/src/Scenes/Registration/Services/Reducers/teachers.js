import * as types from '../Actions/types';

const initialState = [];

const registrationTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTRATION_OF_TEACHER: {
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

export default registrationTeacherReducer;
