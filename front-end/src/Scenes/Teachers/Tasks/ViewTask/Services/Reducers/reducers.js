import * as types from '../Actions/types';

const initialState = {
  error: '',
  taskInfo: {},
  response: '',
};

const viewTask = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_VIEW_USER_TASK_INFORMATION: {
      return {
        ...state,
        taskInfo: { ...action.payload },
      };
    }
    case types.ERROR_VIEW_USER_TASK_INFORMATION: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default viewTask;
