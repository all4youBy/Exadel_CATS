import requestLoginInformation from '../../../../Services/loginService';
import { GET_USER_DATA, LOG_IN, RECEIVE_LOGINDATA, ERROR_LOGINDATA } from '../Actions/types';

const initialState = {
  user: requestLoginInformation() || { role: 'GUEST' },
  error: false,
};

function logIn(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    case RECEIVE_LOGINDATA:
      return { ...state, data: action.payload, error: false };
    case GET_USER_DATA: {
      if (action.payload.text !== 'Bad credentials') {
        return { ...state, user: action.payload, error: false };
      }
      return { ...state, error: true };
    }
    case ERROR_LOGINDATA:
      return { ...state, error: true };
    default:
      return state;
  }
}

export default logIn;
