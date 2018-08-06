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
import addQuestion from '../Scenes/Teachers/Tests/AddQuestion/Services/Reducers/reducers';
import testInformation from '../Scenes/Teachers/Tests/AssignTest/Services/Reducers/reducers';
import myGroups from '../Scenes/Teachers/GroupsList/Groups/Services/Reducers/reducers';
import completeTest from '../Scenes/Users/Tests/Services/Reducers/reducers';
import taskInformation from '../Scenes/Teachers/Tasks/AssignTask/Services/Reducers/reducers';
import passTask from '../Scenes/Users/Task/Services/Reducers/reducers';
import allTasks from '../Scenes/Teachers/Tasks/AllTask/Services/Reducers/reducers';
import trainingTest from '../Scenes/Users/TestList/TrainingTest/Services/Reducers/reducers';
import userAssignedTasks from '../Scenes/Users/Tasks/AssignedTasks/Services/Reducers/reducers';
import userAssignedTests from '../Scenes/Users/TestList/AssignedTestList/Services/Reducers/reducers';
import checkQuestions from '../Scenes/Teachers/Tests/ListCheckTests/Services/Reducers/reducers';
import allGroups from '../Scenes/Teachers/GroupsList/AllGroups/Services/Reducers/reducers';


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
  addQuestion,
  testInformation,
  allGroups,
  taskInformation,
  passTask,
  allTasks,
  completeTest,
  userAssignedTasks,
  userAssignedTests,
  trainingTest,
  myGroups,
  checkQuestions,
});

export default reducers;
