import * as types from './types';

export function registrateStudent(student) {
  return {
    type: types.REGISTRATION_OF_STUDENT,
    payload: student,
  };
}

export function registrateTeacher(teacher) {
  return {
    type: types.REGISTRATION_OF_TEACHER,
    payload: teacher,
  };
}
