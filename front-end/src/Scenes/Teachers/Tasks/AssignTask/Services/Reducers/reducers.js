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
  topics: [],
};

const taskInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TOPICS_ASSIGN_TASK: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case types.ERROR_TOPICS_ASSIGN_TASK:
      return {
        ...state,
        error: action.payload,
      };
    case types.RECEIVE_STUDENTS_LIST_FOR_TASK: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case types.RECEIVE_GROUPS_LIST_FOR_TASK: {
      return {
        ...state,
        groups: [...state.groups, ...action.payload],
      };
    }
    case types.ADD_STUDENT_TO_LIST_TASK: {
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
    case types.DELETE_STUDENT_FROM_LIST_TASK: {
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
    case types.ADD_ASSIGN_TASK_TAG: {
      console.log(action.payload, 33775);
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload,
        ],
      };
    }
    case types.DELETE_ASSIGN_TASK_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    case types.ERROR_STUDENTS_LIST_FOR_TASK:
      return {
        ...state,
        error: action.payload,
      };
    case types.ERROR_GROUPS_LIST_FOR_TASK:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default taskInformation;
