function LoadMainProject(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return action.error;
    case 'GET_REQUESTS':
      return action.data;
    default:
      return state;
  }
}
export default LoadMainProject;
