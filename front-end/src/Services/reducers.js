import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import projectInformation from '../Main/Services/Reducers/mainProject';
import logIn from '../Scenes/LogIn/Services/Reducers/logIn';

import groupStudentsList from '../Scenes/Teachers/GroupsList/GroupStudentsList/Services/Reducers/reducers';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';
import app from '../Main/Services/Reducers/reducers';
import addTask from '../Scenes/Teachers/Tasks/AddTask/Services/Reducers/reducers';
import createGroup from '../Scenes/Teachers/GroupsList/GroupCreation/Services/Reducers/reducers';
import addQuestion from '../Scenes/Teachers/Tests/AddQuestion/Services/Reducers/reducers';

const reducers = combineReducers({
  projectInformation,
  logInInformation: logIn,
  groupStudentsList,
  students,
  teachers,
  createGroup,
  routing: routerReducer,
  app,
  addTask,
  addQuestion,
});

export default reducers;
