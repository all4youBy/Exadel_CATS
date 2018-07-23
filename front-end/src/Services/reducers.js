import { combineReducers } from 'redux';
import projectInformation from '../Main/Services/Reducers/mainProject';
import logIn from '../Scenes/LogIn/Services/Reducers/logIn';

const reducers = combineReducers({
  projectInformation,
  logInInformation: logIn,
});

export default reducers;
