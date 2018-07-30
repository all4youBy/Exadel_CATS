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
    type: types.ADD_TEST_TAG,
    payload: tag[tag.length - 1],
  };
}

export function deleteTestTag(tag) {
  return {
    type: types.DELETE_TEST_TAG,
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
  return (API.get('users/students', 'studentList_for_test', 'Не удалось загрузить список студентов'));
}
