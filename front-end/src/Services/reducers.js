import { combineReducers } from 'redux';
import loadMainProject from '../Main/Services/Reducers/load';
import app from '../Main/Services/Reducers/reducers';
import inOutSet from '../Scenes/Teachers/Tasks/AddTask/Services/Reducers/reducers';

const reducers = combineReducers({
  loadMainProject,
  app,
  inOutSet,
});

export default reducers;
