import { RECEIVE_GETUSERS } from './types';
import API from '../../../../../Services/API';

export function dataUsers(data) {
  return {
    type: RECEIVE_GETUSERS,
    payload: data,
  };
}

export function getUsers(url) {
  return API.get(url, 'getUsers', 'empty list users');
}

export function upDataListUsers(url, data) {
  return API.put(url, data, 'upDataUsers', 'empty list users');
}
