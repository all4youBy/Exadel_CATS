import { combineReducers } from 'redux';
import loadMainProject from '../Main/Services/Reducers/loadMainProject';
import logInReducer from '../Scenes/LogIn/Services/Reducers/logInReducer';

const reducers = combineReducers({
  loadMainProject,
  logInReducer,
});

export default reducers;
