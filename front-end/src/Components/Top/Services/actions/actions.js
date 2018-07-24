import * as types from './types';

export function addStudentTopBySum(student) {
  return {
    type: types.ADD_STUDENT_TOP_BY_SUM,
    payload: student,
  };
}

export function addStudentTopByActivity(student) {
  return {
    type: types.ADD_STUDENT_TOP_BY_ACTIVITY,
    payload: student,
  };
}

export function addStudentTopByTask(student) {
  return {
    type: types.ADD_STUDENT_TOP_BY_TASK,
    payload: student,
  };
}
