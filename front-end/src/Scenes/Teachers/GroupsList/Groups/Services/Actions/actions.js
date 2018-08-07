// import { message } from 'antd';
import API from '../../../../../../Services/API';
import { RECEIVE_RENAME_GROUP, NAME_GROUP, RECEIVE_GROUPSLIST, GET_NAME_GROUP } from './types';

export function deleteGroup(data) {
  return (API.deleteRequest('users/groups', data, 'deleteGroup', 'Не удалось удалить группу'));
}

export function getMyGroups(userId) {
  return (API.get(`users/groups/${userId}`, 'groupsList', 'Не удалось загрузить список групп'));
  // return (API.get('users/groups', 'groupsList', 'Не удалось загрузить список групп'));
}

export function renameGroup(data) {
  return (API.put('users/groups', data, 'rename_group'));
}

export function listGroup(data) {
  return {
    type: RECEIVE_GROUPSLIST,
    payload: data,
  };
}

export function renameNameGroup(data) {
  return {
    type: RECEIVE_RENAME_GROUP,
    payload: data,
  };
}

export function nameGroup(group) {
  return {
    type: NAME_GROUP,
    payload: group,
  };
}
export function getNameGroup(group) {
  return {
    type: GET_NAME_GROUP,
    payload: group,
  };
}

export function getTasksForGroup() {
  return (API.get('users/groups', 'TASKS_FOR_GROUP', 'Не удалось загрузить список групп'));
}
