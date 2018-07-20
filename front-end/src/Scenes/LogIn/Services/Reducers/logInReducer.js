function logInReducer(state = {}, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state,
        user: { username: action.payload.username, password: action.payload.password } };
    case 'RECEIVE_LOGINDATA':
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
export default logInReducer;
