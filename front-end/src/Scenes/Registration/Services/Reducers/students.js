import * as types from '../Actions/types';

const initialState = [];

const registrationStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTRATION_OF_STUDENT: {
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

export default registrationStudentReducer;
