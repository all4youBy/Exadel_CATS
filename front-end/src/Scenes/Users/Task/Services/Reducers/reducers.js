import * as types from '../Actions/types';

const initialState = {
  error: '',
  files: [],
};

const passTask = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_POST_UPLOAD_FILES: {
      return {
        ...state,
        files: [...state.files, ...action.files],
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
