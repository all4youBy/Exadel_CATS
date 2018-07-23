import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loadMainProject from '../Main/Services/Reducers/load';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';
import app from '../Main/Services/Reducers/reducers';
import addTask from '../Scenes/Teachers/Tasks/AddTask/Services/Reducers/reducers';

const reducers = combineReducers({
  loadMainProject,
  students,
  teachers,
  routing: routerReducer,
  app,
  addTask,
});

export default reducers;
