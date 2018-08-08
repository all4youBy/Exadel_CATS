import { message } from 'antd';
import * as types from './types';
import { history } from '../../../../../Services/ConfigureStore';
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
      graduationYear: user.yearTermination || 0,
      institution: user.institution || '',
      placeOfWork: user.job || '',
      primarySkill: user.primarySkill || '',
      specialization: '',
    },
  }, ['EDIT_USER', () => {
    message.success('Данные успешно изменены');
    history.push(`./profile/${user.email}`);
  }, () => {
    message.error('Не удалось изменить данные');
  }]));
}

export function editPassword(user) {
  return (API.put('users/change-password', user, ['CHANGE_PASSWORD', () => {
    message.success('Ваши пароль изменен');
  }, () => {
    message.error('Не удалось изменить пароль');
  }]));
}

export function getUser(email) {
  return (API.get(`users/${email}`, 'GET_USER_FOR_PROFILE', `Не получилось найти пользователя с e-mail: ${email}`));
}
