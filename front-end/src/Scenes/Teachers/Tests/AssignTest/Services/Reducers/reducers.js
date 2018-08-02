import * as types from '../Actions/types';

const initialState = {
  tags: [],
  data: [],
  groups: [],
  students: {
    groups: [],
    addedStudents: [],
  },
  error: '',
  users: '',
  topics: [],
};

const testInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ASSIGN_TEST_TAG: {
      if (state.tags.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload,
        ],
      };
    }
    case types.DELETE_ASSIGN_TEST_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    case types.CREATE_TEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.RECEIVE_STUDENTS_LIST_FOR_TEST: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case types.RECEIVE_ASSIGN_USERS_FROM_GROUP: {
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    }
    case types.RECEIVE_GROUPS_LIST_FOR_TEST: {
      return {
        ...state,
        groups: [...state.groups, ...action.payload],
      };
    }
    case types.ADD_STUDENT_TO_LIST: {
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
    case types.DELETE_STUDENT_FROM_LIST: {
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
    case types.ERROR_STUDENTS_LIST_FOR_TEST:
      return {
        ...state,
        error: action.payload,
      };
    case types.ERROR_ASSIGN_USERS_FROM_GROUP:
      return {
        ...state,
        error: action.payload,
      };
    case types.ERROR_GROUPS_LIST_FOR_TEST:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default testInformation;
