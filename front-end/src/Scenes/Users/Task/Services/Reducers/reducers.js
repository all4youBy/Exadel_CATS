import * as types from '../Actions/types';

const initialState = {
  error: '',
  files: [],
  taskInfo: {},
  responseTaskSolution: '',
  response: '',
  responseAddFile: true,
};

const passTask = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_RESPONSE_ADD_FILE: {
      return {
        ...state,
        responseAddFile: true,
      };
    }
    case types.RECEIVE_POST_ADD_TASK_SOLUTION: {
      return {
        ...state,
        response: { ...action.payload },
      };
    }
    case types.RECEIVE_USER_TASK_INFORMATION: {
      return {
        ...state,
        taskInfo: { ...action.payload },
      };
    }
    case types.RECEIVE_POST_UPLOAD_FILES: {
      const text = action.payload.text ? !action.payload.text : true;
      return {
        ...state,
        responseAddFile: text,
      };
    }
    case types.ERROR_USER_TASK_INFORMATION: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case types.ERROR_POST_UPLOAD_FILES: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default passTask;
