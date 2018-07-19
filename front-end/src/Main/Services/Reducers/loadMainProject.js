function LoadMainProject(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
}
export default LoadMainProject;
