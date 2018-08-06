import * as types from './types';
import API from '../../../../../../Services/API';

export function addStudent(student) {
  return {
    type: types.ADD_STUDENT, payload: student,
  };
}

export function deleteStudent(student) {
  return (API.deleteRequest('users', student, 'delete_student', 'Не удалось удалить студента'));
}

export function fetchStudentsGroup(groupName) {
  return (API.get(`users/find-by-group?group=${groupName}`,
    'students_by_group',
    'Не удалось загрузить список студентов'));
}
