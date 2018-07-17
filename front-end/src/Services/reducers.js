import { combineReducers } from 'redux';
import loadMainProject from '../Main/Services/Reducers/load';
import groupStudentsList from '../Scenes/Teachers/GroupsList/GroupStudentsList/Services/Reducers/reducers';

const reducers = combineReducers({
  loadMainProject,
  groupStudentsList,
});

export default reducers;
