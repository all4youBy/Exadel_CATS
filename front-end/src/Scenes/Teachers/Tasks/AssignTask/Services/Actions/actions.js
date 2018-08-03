import * as types from './types';
import API from '../../../../../../Services/API';

export function addTestTag(tag) {
  return {
    type: types.ADD_ASSIGN_TASK_TAG,
    payload: tag,
  };
}

export function deleteTestTag(tag) {
  return {
    type: types.DELETE_ASSIGN_TASK_TAG,
    payload: tag,
  };
}

export function addStudentToList(student) {
  return {
    type: types.ADD_STUDENT_TO_LIST_TASK,
    payload: student,
  };
}

export function deleteStudentFromList(student) {
  return {
    type: types.DELETE_STUDENT_FROM_LIST_TASK,
    payload: student,
  };
}

export function fetchStudentListForTask() {
  return (API.get('users/students', 'students_list_for_task', 'Не удалось загрузить список студентов'));
}

export function groupsListForTask(userId) {
  return (API.get(`users/groups/${userId}`, 'groupsList', 'Не удалось загрузить список групп'));
}

export function fetchTopics() {
  return (API.get('topics', 'topics_assign_task', 'Не удалось загрузить темы'));
}
