function logInReducer(state = {}, action) {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        user: { username: action.user.username, password: action.user.password },
      });
    case 'RECEIVE_LOGINDATA':
      return Object.assign({}, state, {
        payload: { users: action.users },
      });
    default:
      return state;
  }
}
export default logInReducer;
