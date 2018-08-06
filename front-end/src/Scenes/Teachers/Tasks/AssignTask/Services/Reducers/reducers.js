import * as types from '../Actions/types';

const initialState = {
  data: [],
  groups: [],
  students: {
    groups: [],
    addedStudents: [],
  },
  error: '',
  users: '',
  type: 'GROUPS',
  tasks: [],
};

const taskInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TASK: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.RECEIVE_TASK: {
      if (typeof action.payload === 'string') {
        if (state.students.groups.includes(action.payload)) {
          return state;
        }
        return {
          ...state,
          receiver: action.payload,
          type: action.typeData,
        };
      }
      if (state.students.addedStudents.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        students: {
          ...state.students,
          addedStudents: [
            ...state.students.addedStudents,
            action.payload,
          ],
        },
      };
    }
    case types.ERROR_ALL_TASKS_ASSIGN:
      return {
        ...state,
        error: action.payload,
      };
    case types.RECEIVE_ALL_TASKS_ASSIGN:
      return {
        ...state,
        tasks: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default taskInformation;
