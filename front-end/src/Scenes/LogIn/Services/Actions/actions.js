import { LOG_IN, USER_DATA } from './types';

export function logIn(name, key) {
  return {
    type: LOG_IN,
    payload: { username: name, password: key },
  };
}

export function getUserData(data) {
  return {
    type: USER_DATA,
    payload: data,
  };
}
