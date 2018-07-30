import requestLoginInformation from '../../../../Services/loginService';
import { GET_USER_DATA, LOG_IN, RECEIVE_LOGINDATA } from '../Actions/types';

const initialState = {
  user: requestLoginInformation() || { role: 'GUEST' },
};

function logIn(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state,
        username: action.payload.username,
        password: action.payload.password };
    case RECEIVE_LOGINDATA:
      return { ...state, data: action.payload };
    case GET_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
export default logIn;
