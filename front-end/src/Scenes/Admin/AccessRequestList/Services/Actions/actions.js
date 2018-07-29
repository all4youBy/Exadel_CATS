import { RECEIVE_USERS } from './types';
import API from '../../../../../Services/API';

export function dataUsers(data) {
  return {
    type: RECEIVE_USERS,
    payload: data,
  };
}

export function getUsers(url) {
  return API.get(url, 'users');
}

export function upDataListUsers(url, data) {
  return API.put(url, data, 'users');
}
