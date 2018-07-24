import { combineReducers } from 'redux';
import projectInformation from '../Main/Services/Reducers/mainProject';
import logIn from '../Scenes/LogIn/Services/Reducers/logIn';

import { routerReducer } from 'react-router-redux';

import groupStudentsList from '../Scenes/Teachers/GroupsList/GroupStudentsList/Services/Reducers/reducers';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';

const reducers = combineReducers({
  projectInformation,
  logInInformation: logIn,
  groupStudentsList,
  students,
  teachers,
  routing: routerReducer,
});

export default reducers;
