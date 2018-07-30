import * as types from './types';
import API from '../../../../../../Services/API';

export function editGroup(group) {
  return {
    type: types.ADD_GROUP, payload: group,
  };
}

export function addGroup(group) {
  return {
    type: types.ADD_GROUP, payload: group,
  };
}

export function deleteGroup(id) {
  return {
    type: types.DELETE_GROUP, payload: id,
  };
}

export function fetchGroups() {
  return (API.get('users/groups', 'groupsList', ''));
}
