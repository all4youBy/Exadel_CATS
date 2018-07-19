function LoadMainProject(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return action.error;
    default:
      return state;
  }
}
export default LoadMainProject;
