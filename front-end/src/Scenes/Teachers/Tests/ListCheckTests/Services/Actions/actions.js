// import * as types from './types';
// import { message } from 'antd/lib/index';
import API from '../../../../../../Services/API';

export function fetchQuestionsToCheck(email) {
  return API.get(`tests/answers-for-manual-check/${email}`, ['questions_to_check', (item) => {
    console.log(item);
  }], 'Не удалось загрузить список вопросов');
}

export function putManualCheck(data) {
  return API.put('tests/submit-manual', data, ['manual_check', (item) => {
    console.log(item);
  }, () => {
    console.log('error');
  }], 'Не удалось загрузить список вопросов');
}
