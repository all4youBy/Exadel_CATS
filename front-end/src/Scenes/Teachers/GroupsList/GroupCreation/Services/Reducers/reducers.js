import * as types from '../Actions/types';

const initialState = {
  data: [],
  students: {
    groups: [],
    addedStudents: [],
  },
  error: '',
  successMessage: '',
  groups: [],
  topics: [],
  errorTopics: '',
};
const createGroup = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_POSTGROUP:
      return {
        ...state,
        successMessage: action.payload,
      };
    case types.RECEIVE_TOPICS_CREATE_GROUP:
      return {
        ...state,
        topics: action.payload,
      };
    case types.ERROR_TOPICS_CREATE_GROUP:
      return {
        ...state,
        errorTopics: action.payload,
      };
    case types.ERROR_STUDENT_LIST:
      return {
        ...state,
        error: action.payload,
      };
    case types.ERROR_GROUPS_LIST:
      return {
        ...state,
        error: action.payload,
      };
    case types.RECEIVE_STUDENT_LIST: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case types.RECEIVE_GROUPS_LIST: {
      return {
        ...state,
        groups: [...state.groups, ...action.payload],
      };
    }
    case types.ADD_STUDENT_TO_GROUP: {
      if (typeof action.payload === 'string') {
        if (state.students.groups.includes(action.payload)) {
          return state;
        }
        return {
          ...state,
          students: {
            ...state.students,
            groups: [
              ...state.students.groups,
              action.payload,
            ],
          },
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
    case types.DELETE_STUDENT_FROM_GROUP: {
      let flag = false;
      state.students.addedStudents.forEach((element, index) => {
        if (`${element.lastName} ${element.firstName}` === action.payload) {
          state.students.addedStudents.splice(index, 1);
          flag = 1;
        }
      });
      state.students.groups.forEach((element, index) => {
        if (element === action.payload) {
          state.students.groups.splice(index, 1);
          flag = 0;
        }
      });
      if (flag) {
        return {
          ...state,
          students: {
            ...state.students,
            addedStudents: state.students.addedStudents,
          },
        };
      }
      return {
        ...state,
        students: {
          ...state.students,
          groups: state.students.groups,
        },
      };
    }
    default:
      return state;
  }
};

export default createGroup;
