import * as types from './types';

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
