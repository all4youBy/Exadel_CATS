import * as types from './types';
import API from '../../../../../Services/API';

export function errorEditingUser(user) {
  return {
    type: types.ERROR_EDIT_USER,
    payload: user,
  };
}

export function errorEditingPassword(user) {
  return {
    type: types.ERROR_CHANGE_PASSWORD,
    payload: user,
  };
}

export function editUserWithoutPassword(user) {
  return (API.put('users', {
    email: user.email,
    firstName: user.firstName,
    lastName: user.secondName,
    userAffiliation: {
      faculty: user.faculty,
      graduationYear: user.yearTermination,
      institution: user.institution,
      placeOfWork: user.job,
      primarySkill: user.primarySkill,
      specialization: '',
    },
  }, 'EDIT_USER', 'Не получилось изменить информацию'));
}

export function editPassword(user) {
  return (API.put('users/change-password', user, 'CHANGE_PASSWORD', 'Не удалось изменить пароль'));
}

export function getUser(email) {
  return (API.get(`users/${email}`, 'GET_USER_FOR_PROFILE', `Не получилось найти пользователя с e-mail: ${email}`));
}
