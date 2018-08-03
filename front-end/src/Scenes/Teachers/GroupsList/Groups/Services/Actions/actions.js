import API from '../../../../../../Services/API';
import { RECEIVE_GROUPSLIST } from './types';

export function deleteGroup(data) {
  return (API.deleteRequest('users/groups', data, 'deleteGroup', 'Не удалось удалить группу'));
}

export function getMyGroups(userId) {
  return (API.get(`users/groups/${userId}`, 'groupsList', 'Не удалось загрузить список групп'));
  // return (API.get('users/groups', 'groupsList', 'Не удалось загрузить список групп'));
}

export function listGroup(data) {
  return {
    type: RECEIVE_GROUPSLIST,
    payload: data,
  };
}
