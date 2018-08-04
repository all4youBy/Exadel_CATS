import API from '../../../../../../Services/API';
import { EDIT_GROUP, NAME_GROUP, RECEIVE_GROUPSLIST } from './types';

export function deleteGroup(data) {
  return (API.deleteRequest('users/groups', data, 'deleteGroup', 'Не удалось удалить группу'));
}

export function getMyGroups(userId) {
  return (API.get(`users/groups/${userId}`, 'groupsList', 'Не удалось загрузить список групп'));
  // return (API.get('users/groups', 'groupsList', 'Не удалось загрузить список групп'));
}

export function renameGroup(data) {
  return (API.put('users/groups', data, 'rename_Group', 'Не удалось переименовать группу'));
}

export function listGroup(data) {
  return {
    type: RECEIVE_GROUPSLIST,
    payload: data,
  };
}
export function editNameGroup(data) {
  return {
    type: EDIT_GROUP,
    payload: data,
  };
}
export function nameGroup(group) {
  return {
    type: NAME_GROUP,
    payload: group,
  };
}
