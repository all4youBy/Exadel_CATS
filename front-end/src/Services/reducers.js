import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loadMainProject from '../Main/Services/Reducers/load';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';

const reducers = combineReducers({
  loadMainProject,
  students,
  teachers,
  routing: routerReducer,
});

export default reducers;
