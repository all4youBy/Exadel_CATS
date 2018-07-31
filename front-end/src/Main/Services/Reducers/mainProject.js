import { ERROR_MAIN } from '../Actions/types';


function mainProject(state = {}, action) {
  switch (action.type) {
    case ERROR_MAIN:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
export default mainProject;
