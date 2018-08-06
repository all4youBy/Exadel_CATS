import API from '../../../../Services/API';

export function reqRegistrateStudent(user) {
  return API.registratePost('registrated_student', user, 'Регистрация не произошла');
}


export function reqRegistrateTeacher(user) {
  return API.registratePost('registrated_teacher', user, 'Регистрация не произошла');
}
