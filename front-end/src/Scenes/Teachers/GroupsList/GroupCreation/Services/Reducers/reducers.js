import * as types from '../Actions/types';

const initialState = {
  data: [],
  students: [],
};
const createGroup = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_STUDENTLIST': {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload,
        ],
      };
    }
    case types.ADD_STUDENT_TO_GROUP: {
      if (state.students.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        students: [
          ...state.students,
          action.payload,
        ],
      };
    }
    case types.DELETE_STUDENT_FROM_GROUP: {
      return {
        ...state,
        students: state.students.filter(tag => tag !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default createGroup;
