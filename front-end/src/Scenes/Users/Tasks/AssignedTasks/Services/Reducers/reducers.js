import * as types from '../Actions/types';

const initialState = {
  tasks: null,
  error: '',
};

const userAssignedTasks = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_USER_ASSIGNED_TASKS: {
      return {
        ...state,
        tasks: [...action.payload],
      };
    }
    case types.ERROR_USER_ASSIGNED_TASKS:
      return {
        ...state,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default userAssignedTasks;
