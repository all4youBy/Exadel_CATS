function LoadMainProject(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return action.error;
    case 'FETCH_DATA':
      return action.data;
    default:
      return state;
  }
}
export default LoadMainProject;
