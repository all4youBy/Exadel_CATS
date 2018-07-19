function logInReducer(state = {}, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, username: action.username, password: action.password };
    case 'RECEIVE_LOGINDATA':
      return action.data;
    default:
      return state;
  }
}
export default logInReducer;
