import { RECEIVE_USERS } from '../Actions/types';

const initialState = {
  users: [],
};

function requestsUsers(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export default requestsUsers;
