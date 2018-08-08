/* eslint-disable import/no-cycle */
import { LOG_IN, GET_USER_DATA, GET_ERROR_FALSE } from './types';
import API from '../../../../Services/API';

export function logIn(name, key) {
  return {
    type: LOG_IN,
    payload: { username: name, password: key },
  };
}

export function getUserData(data) {
  return {
    type: GET_USER_DATA,
    payload: data,
  };
}

export function getErrorFalse() {
  return {
    type: GET_ERROR_FALSE,
  };
}

export function logInData(url, data) {
  return API.login(url, data);
}
