import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loadMainProject from '../Main/Services/Reducers/load';
import students from '../Scenes/Registration/Services/Reducers/students';
import teachers from '../Scenes/Registration/Services/Reducers/teachers';
import top from '../Components/Top/Services/reducers/reducers';

const reducers = combineReducers({
  loadMainProject,
  students,
  teachers,
  top,
  routing: routerReducer,
});

export default reducers;
