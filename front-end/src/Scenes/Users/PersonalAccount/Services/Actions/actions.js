import * as types from './types';

export function addStudent(student) {
  return {
    type: types.ADD_STUDENT, payload: student,
  };
}

export function deleteStudent(student) {
  return {
    type: types.DELETE_STUDENT, payload: student,
  };
}
