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

export function fetchUserAssignedTests(userId) {
  return (API.get(`tests/user-tests/${userId}`,
    'tests_assigned_to_user',
    'Не удалось загрузить список назначенных тестов'));
}
