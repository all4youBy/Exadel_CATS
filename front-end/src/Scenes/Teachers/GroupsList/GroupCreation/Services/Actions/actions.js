import * as types from './types';
import API from '../../../../../../Services/API';

export function addStudentToGroup(student) {
  return {
    type: types.ADD_STUDENT_TO_GROUP,
    payload: student,
  };
}

export function deleteStudentFromGroup(student) {
  return {
    type: types.DELETE_STUDENT_FROM_GROUP,
    payload: student,
  };
}

export function fetchStudentList() {
  return (API.get('users/students', 'student_list', 'Не удалось загрузить список студентов'));
}

export function fetchGroupsList() {
  return (API.get('users/groups', 'groups_list', 'Не удалось загрузить список групп'));
}

export function postGroup(data) {
  return (API.post('users', data, 'postgroup', 'Не удалось создать группу'));
}
