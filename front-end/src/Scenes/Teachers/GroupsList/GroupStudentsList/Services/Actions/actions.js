import * as types from './types';
import API from '../../../../../../Services/API';

export function addStudent(student) {
  return {
    type: types.ADD_STUDENT, payload: student,
  };
}

export function deleteStudent(student) {
  return (API.put('users/groups/delete-user-from-group', student, 'delete_student'));
}

export function fetchStudentsGroup(groupName) {
  return (API.get(`users/find-by-group?group=${groupName}`,
    'students_by_group',
    'Не удалось загрузить список студентов'));
}
export function assignedTasks(userId) {
  return (API.get(
    `task/users-tasks/${userId}`,
    'assigned_tasks',
    'Не удалось загрузить список задач',
  ));
}
export function getUser(student) {
  return {
    type: types.GET_USER, payload: student,
  };
}
