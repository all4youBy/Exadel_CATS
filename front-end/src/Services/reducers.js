import { combineReducers } from 'redux';
import loadMainProject from '../Main/Services/Reducers/load';
import groupStudentsList from '../Scenes/Teachers/GroupsList/GroupStudentsList/Services/Reducers/reducers';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';


const reducers = combineReducers({
  loadMainProject,
  groupStudentsList,
  students,
  teachers,
});

export default reducers;
