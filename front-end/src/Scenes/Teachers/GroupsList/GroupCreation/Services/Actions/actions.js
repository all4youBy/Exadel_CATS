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
  return (API.get('users/students', 'studentList', 'Не удалось загрузить список студентов'));
}
export function receiveStudentList(data) {
  return {
    type: types.RECEIVE_STUDENTLIST,
    payload: data,
  };
}

export function postGroup(data) {
  return (API.post('users', data, 'postgroup', 'Не удалось создать группу'));
}
