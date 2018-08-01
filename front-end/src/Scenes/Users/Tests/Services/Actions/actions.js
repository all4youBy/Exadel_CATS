import API from '../../../../../Services/API';
import * as types from './types';

export function fetchTestData(testId) {
  return (API.get(`tests/${testId}`, 'test_Data', 'Не удалось загрузить данные теста'));
}

export function receiveTestData(data) {
  return {
    type: types.RECEIVE_TEST_DATA,
    payload: data,
  };
}

export function postTestAnswer(data) {
  return (API.put('tests/submit-question', data, 'post_test_answer', 'Не удалось отправить вопрос'));
}

export function postTest(testId) {
  return (API.put('tests/submit-test', testId, 'post_test', 'Не удалось отправить тест'));
}
