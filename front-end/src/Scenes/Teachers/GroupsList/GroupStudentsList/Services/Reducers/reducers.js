import * as types from '../Actions/types';

const initialState = {
  group: null,
  assignedTasks: [],
  groupName: '',
};

const groupStudentsList = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NAME_GROUP:
      return {
        ...state,
        groupName: action.payload,
      };

    case types.RECEIVE_ASSIGNED_TASKS: {
      const tasks = [...state.assignedTasks];
      tasks.push(action.payload);
      return {
        ...state,
        assignedTasks: tasks,
      };
    }

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
    case types.RECEIVE_STUDENTS_BY_GROUP:
      return { ...state, group: action.payload };
    default:
      return state;

    case types.ERROR_STUDENTS_BY_GROUP:
      return {
        ...state,
        error: action.payload,
      };
    case types.RECEIVE_DELETE_STUDENT: {
      let students = [...state.groups];
      const idRemove = action.payload;
      students = students.filter(e => e !== idRemove);
      students.forEach((element, index) => {
        element.key = String(index + 1);
      });
      return { groups: students };
    }
  }
};
export default groupStudentsList;
