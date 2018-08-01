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
import requestsUsers from '../Scenes/Admin/AccessRequestList/Services/Reducers/reducers';
import testInformation from '../Scenes/Teachers/Tests/AssignTest/Services/Reducers/reducers';
import allGroups from '../Scenes/Teachers/GroupsList/Groups/Services/Reducers/reducers';
import completeTest from '../Scenes/Users/Tests/Services/Reducers/reducers';
import completeTask from '../Scenes/Users/Task/Sevices/Reducers/reducers';


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
  requestsUsers,
  testInformation,
  allGroups,
  completeTest,
  completeTask,
});

export default reducers;
