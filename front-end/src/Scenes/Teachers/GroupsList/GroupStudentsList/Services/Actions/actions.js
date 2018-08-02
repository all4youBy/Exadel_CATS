import * as types from './types';
import API from '../../../../../../Services/API';

export function addStudent(student) {
  return {
    type: types.ADD_STUDENT, payload: student,
  };
}

export function deleteStudent(number) {
  return {
    type: types.DELETE_STUDENT, payload: number,
  };
}

export function fetchStudentsGroup(groupName) {
  return (API.get(`users/find-by-group?group=${groupName}`,
    'students_by_group',
    'Не удалось загрузить список студентов'));
}
