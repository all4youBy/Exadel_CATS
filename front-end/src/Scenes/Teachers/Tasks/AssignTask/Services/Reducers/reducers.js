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
  type: 'GROUPS',
};

const taskInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ASSIGN_TASK_TAG: {
      if (state.tags.includes(action.payload)) {
        return { ...state };
      }
      if (!action.payload) {
        return { ...state };
      }
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload,
        ],
      };
    }
    case types.RECEIVE_TOPICS_ASSIGN_TASK: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case types.ERROR_TOPICS_ASSIGN_TASK: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case types.DELETE_ASSIGN_TASK_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag.text !== action.payload),
      };
    }
    case types.CREATE_TASK: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.RECEIVE_STUDENTS_LIST_FOR_TASK: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    // case types.RECEIVE_ASSIGN_USERS_FROM_GROUP: {
    //   return {
    //     ...state,
    //     users: [...state.users, ...action.payload],
    //   };
    // }
    case types.RECEIVE_GROUPS_LIST_FOR_TASK: {
      return {
        ...state,
        groups: [...state.groups, ...action.payload],
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
