import * as types from './types';
import API from '../../../../../../Services/API';

export function createTest(test) {
  return {
    type: types.CREATE_TEST,
    payload: test,
  };
}

export function addTestTag(tag) {
  return {
    type: types.ADD_ASSIGN_TEST_TAG,
    payload: tag,
  };
}

export function deleteTestTag(tag) {
  return {
    type: types.DELETE_ASSIGN_TEST_TAG,
    payload: tag,
  };
}

export function addStudentToList(student) {
  return {
    type: types.ADD_STUDENT_TO_LIST,
    payload: student,
  };
}

export function deleteStudentFromList(student) {
  return {
    type: types.DELETE_STUDENT_FROM_LIST,
    payload: student,
  };
}

export function fetchStudentListForTest() {
  return (API.get('users/students', 'students_list_for_test', 'Не удалось загрузить список студентов'));
}

export function fetchGroupsListForTest() {
  return (API.get('users/groups', 'groups_list_for_test', 'Не удалось загрузить список групп'));
}

export function fetchUsersFromGroup(groupName) {
  return (API.get(
    `users/find-by-group?group=${groupName}`,
    'assign_test_users_from_group',
    'Не удалось загрузить список групп',
  ));
}

export function fetchTopics() {
  return (API.get('topics', 'topics_assign_test', 'Не удалось загрузить темы'));
}
