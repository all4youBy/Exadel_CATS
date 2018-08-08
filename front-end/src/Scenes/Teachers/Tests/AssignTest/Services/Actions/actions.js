import { message } from 'antd';
import * as types from './types';
import { history } from '../../../../../../Services/ConfigureStore';
import API from '../../../../../../Services/API';

export function createTest(data, url) {
  return API.post(`${url}`, data, ['create_test', () => {
    message.success('Тест успешно назначен');
    if (url !== '') {
      history.push('/mygroups');
    }
  }, () => {
    message.error('Не удалось назначить тест');
  }]);
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

export function receiveTest(group, data) {
  return {
    type: types.RECEIVE_TEST,
    payload: group,
    typeData: data,
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

export function groupsListForTest(userId) {
  return (API.get(`users/groups/${userId}`, 'groupsList', 'Не удалось загрузить список групп'));
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
