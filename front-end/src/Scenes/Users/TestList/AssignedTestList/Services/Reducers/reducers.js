import * as types from '../Actions/types';

const initialState = {
  assignedTests: [],
};

const groupStudentsList = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_STUDENT: {
      const lastNumber = state.group.length ? +state.group[state.group.length - 1].number + 1 : 1;
      const lastKey = state.group.length ? +state.group[state.group.length - 1].key + 1 : 1;
      action.payload.number = String(lastNumber);
      action.payload.name += lastKey;
      action.payload.key = String(lastKey);
      // const newStudent = { ...action.payload };
      // console.log(state.group, 858585858);
      // const newState = state.group.push(action.payload);
      // newState.push(newStudent);
      const students = [...state.group];
      students.push(action.payload);
      const newState = { group: students };
      return newState;
    }

    case types.DELETE_STUDENT: {
      let students = [...state.group];
      const idRemove = action.payload;
      students = students.filter(e => e.number !== idRemove);
      students.forEach((element, index) => {
        element.number = String(index + 1);
      });
      return { group: students };
    }
    case types.RECEIVE_TESTS_ASSIGNED_TO_USER:
      return { ...state, assignedTests: action.payload };
    default:
      return state;

    case types.ERROR_STUDENTS_BY_GROUP:
      return {
        ...state,
        error: action.payload,
      };
  }
};

export default groupStudentsList;
