function LoadMainProject(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}
export default LoadMainProject;
