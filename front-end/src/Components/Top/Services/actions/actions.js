import * as types from './types';
import API from '../../../../Services/API';

export function addStudentTopBySum() {
  return (API.get('statistic/tasks', 'STUDENT_TOP_BY_SUM', 'Не удалось получить топ по сумме'));
}

export function addStudentTopByActivity(student) {
  return {
    type: types.RECEIVE_STUDENT_TOP_BY_ACTIVITY,
    payload: student,
  };
}

export function addStudentTopByTask(student) {
  return {
    type: types.RECEIVE_STUDENT_TOP_BY_TASK,
    payload: student,
  };
}
