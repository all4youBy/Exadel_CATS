function logInReducer(state = {}, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { username: action.username, password: action.password };
    default:
      return state;
  }
}
export default logInReducer;
