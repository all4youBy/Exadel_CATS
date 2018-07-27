import * as types from '../Actions/types';

const initialState = {
  students: [],
};
const createGroup = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_STUDENT_TO_GROUP: {
      return {
        ...state,
        students: [
          ...state.students,
          action.payload,
        ],
      };
    }
    default:
      return state;
  }
};

export default createGroup;
