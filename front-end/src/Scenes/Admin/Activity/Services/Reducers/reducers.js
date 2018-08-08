import { RECEIVE_ACTIVITY, ERROR_ACTIVITY } from '../Actions/types';

const initialState = {
  activity: null,
  error: '',
};

function activityPage(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACTIVITY: {
      return { ...state, activity: action.payload };
    }
    case ERROR_ACTIVITY: {
      return { ...state, error: true };
    }
    default:
      return state;
  }
}

export default activityPage;
