import * as types from '../Actions/types';

const initialState = {
  tasks: [],
  error: '',
};

const allTasks = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ALL_TASKS: {
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
      };
    }
    case types.ERROR_STUDENTS_LIST_FOR_TASK:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default allTasks;
