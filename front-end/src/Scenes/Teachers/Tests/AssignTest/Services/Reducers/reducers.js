import * as types from '../Actions/types';

const initialState = {
  tags: [],
  data: [],
  students: [],
  error: '',
};

const testInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.RECEIVE_STUDENTLIST_FOR_TEST: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    }
    case types.ADD_STUDENT_TO_LIST: {
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
    case types.DELETE_STUDENT_FROM_LIST: {
      return {
        ...state,
        students: state.students.filter(tag => tag !== action.payload),
      };
    }
    case types.ADD_TEST_TAG: {
      if (state.tags.includes(action.payload) || action.payload.length === 0) {
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
    case types.DELETE_TEST_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    case types.ERROR_STUDENTLIST_FOR_TEST:
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
