import { RECEIVE_GETUSERS, ERROR_GETUSERS, RECEIVE_UPDATAUSERS } from '../Actions/types';

const initialState = {
  users: [],
  emptyList: true,
};

function requestsUsers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GETUSERS: {
      return { ...state, users: action.payload, emptyList: false };
    }
    case ERROR_GETUSERS: {
      return { ...state, users: [], emptyList: false };
    }
    case RECEIVE_UPDATAUSERS: {
      return { ...state, emptyList: action.payload };
    }
    default:
      return state;
  }
}

export default requestsUsers;
