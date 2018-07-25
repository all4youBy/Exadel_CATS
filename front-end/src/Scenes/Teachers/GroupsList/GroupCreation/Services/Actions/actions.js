import * as types from './types';

export function addStudentToGroup(student) {
  return {
    type: types.ADD_STUDENT_TO_GROUP,
    payload: student,
  };
}

export function deleteStudentFromGroup() {
  return {
    type: types.DELETE_STUDENT_FROM_GROUP,
  };
}
