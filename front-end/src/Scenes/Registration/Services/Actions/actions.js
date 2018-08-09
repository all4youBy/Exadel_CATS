import { message } from 'antd';
import API from '../../../../Services/API';
import { history } from '../../../../Services/ConfigureStore';

export function reqRegistrateStudent(user) {
  return API.registratePost(['registrated_student', () => {
    message.success('Вам пришел на почту пароль! Регистрация выполнена успешнo');
    history.push('/login');
  }, () => {
    message.error('Регистрация не произошла');
  }], user, 'Регистрация не произошла');
}


export function reqRegistrateTeacher(user) {
  return API.registratePost(['registrated_teacher', () => {
    message.success('Вам пришел на почту пароль! Регистрация выполнена успешнo');
    history.push('/login');
  }, () => {
    message.error('Регистрация не произошла');
  }], user, 'Регистрация не произошла');
}
