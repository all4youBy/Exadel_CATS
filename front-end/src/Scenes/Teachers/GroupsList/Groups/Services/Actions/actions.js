import * as types from './types';

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
