import { ERROR } from '../Actions/types';

function mainProject(state = {}, action) {
  switch (action.type) {
    case ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
export default mainProject;
